import { Metadata } from "next"
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3"
import PraiseContent, { PraiseItem } from "@/components/praise-content"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "부활교회 찬양 - 부활교회",
  description: "부활교회 찬양 이미지 갤러리",
}

async function getPraiseList(): Promise<PraiseItem[]> {
  const region = process.env.AWS_REGION || "ap-northeast-2"
  const bucket = process.env.AWS_S3_BUCKET
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
  const cfDomain = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN || process.env.CLOUDFRONT_DOMAIN

  if (!bucket || !accessKeyId || !secretAccessKey) {
    console.warn("⚠️ AWS S3 자격 증명이 설정되지 않았습니다. 빈 찬양 목록으로 빌드합니다.");
    return []
  }

  try {
    const client = new S3Client({
      region,
      credentials: { accessKeyId, secretAccessKey },
    })

    // 1. praise-images/ 디렉토리 바로 하위의 폴더(/ 구분)와 단일 파일들을 1차 조회
    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: "praise-images/",
      Delimiter: "/",
    })

    const response = await client.send(command)
    const praiseItems: PraiseItem[] = []
    let idCounter = 1

    // 2. 단일 파일 처리 (praise-images/ 바로 하위의 이미지들)
    const files = response.Contents?.filter(item => {
      const key = item.Key || ""
      const lowerKey = key.toLowerCase()
      return (
        key !== "praise-images/" &&
        (lowerKey.endsWith(".jpg") ||
          lowerKey.endsWith(".jpeg") ||
          lowerKey.endsWith(".png") ||
          lowerKey.endsWith(".webp"))
      )
    }) || []

    for (const file of files) {
      const rawKey = file.Key || ""
      // 경로와 확장자 제거하여 제목 생성 (예: praise-images/은혜.jpg -> 은혜)
      const title = rawKey.replace("praise-images/", "").replace(/\.[^/.]+$/, "")
      
      let url = ""
      if (cfDomain) {
        url = `https://${cfDomain.replace(/\/$/, "")}/${rawKey.replace(/^\//, "")}`
      } else {
        url = `https://${bucket}.s3.${region}.amazonaws.com/${rawKey}`
      }

      praiseItems.push({
        id: idCounter++,
        title,
        thumbnailUrl: url,
        isFolder: false,
        rawKey,
      })
    }

    // 3. 폴더(CommonPrefixes) 처리 (praise-images/하위의 폴더들)
    const folders = response.CommonPrefixes || []
    for (const folder of folders) {
      const folderPrefix = folder.Prefix || ""
      const title = folderPrefix.replace("praise-images/", "").replace("/", "")
      if (!title) continue

      // 폴더 내부의 첫 번째 이미지를 찾아 썸네일로 사용
      const subCommand = new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: folderPrefix,
      })
      const subResponse = await client.send(subCommand)
      
      const firstImage = subResponse.Contents?.find(item => {
        const k = item.Key?.toLowerCase() || ""
        return (
          k.endsWith(".jpg") ||
          k.endsWith(".jpeg") ||
          k.endsWith(".png") ||
          k.endsWith(".webp")
        )
      })

      if (firstImage && firstImage.Key) {
        let url = ""
        if (cfDomain) {
          url = `https://${cfDomain.replace(/\/$/, "")}/${firstImage.Key.replace(/^\//, "")}`
        } else {
          url = `https://${bucket}.s3.${region}.amazonaws.com/${firstImage.Key}`
        }

        praiseItems.push({
          id: idCounter++,
          title,
          thumbnailUrl: url,
          isFolder: true,
          rawKey: folderPrefix,
        })
      }
    }

    // 4. 찬양 제목 기준으로 가나다순(오름차순) 정렬
    return praiseItems.sort((a, b) => a.title.localeCompare(b.title, "ko"))
  } catch (err) {
    console.error("S3 praise list load failed:", err)
    return []
  }
}

export default async function PraiseListPage() {
  const praiseList = await getPraiseList()

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      <main className="flex-1 bg-white">
        {/* 히어로 타이틀 배너 */}
        <div className="bg-gray-50 py-10 border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <h1 className="text-[26px] sm:text-[30px] font-bold text-gray-800 inline-block relative leading-tight">
              부활 찬양
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#fcaa4c]" />
            </h1>            
          </div>
        </div>
        <PraiseContent initialPraiseData={praiseList} />
      </main>
      <Footer />
    </div>
  )
}
