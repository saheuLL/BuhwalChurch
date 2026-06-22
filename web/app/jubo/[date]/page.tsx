import { Metadata } from "next"
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChevronLeft } from "lucide-react"

// Next.js 15+ 대응을 위한 PageProps 정의
interface PageProps {
  params: Promise<{
    date: string
  }>
}

// 빌드 타임에 S3에서 날짜 폴더 목록을 가져오는 함수
async function getJuboDates(): Promise<string[]> {
  const region = process.env.AWS_REGION || "ap-northeast-2"
  const bucket = process.env.AWS_S3_BUCKET
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

  if (!bucket || !accessKeyId || !secretAccessKey) {
    return []
  }

  try {
    const client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    })

    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: "jubo/",
      Delimiter: "/",
    })

    const response = await client.send(command)
    const folders = response.CommonPrefixes?.map(p => {
      return p.Prefix?.replace("jubo/", "").replace("/", "") || ""
    }).filter(Boolean) || []

    return folders
  } catch (err) {
    console.error("Static params S3 fetch failed:", err)
    return []
  }
}

// Next.js Static Export를 위한 정적 파라미터 생성
export async function generateStaticParams() {
  const dates = await getJuboDates()
  return dates.map((date) => ({
    date: date,
  }))
}

// 특정 날짜 폴더의 이미지 파일 목록을 S3에서 조회하는 함수
async function getJuboImages(date: string): Promise<string[]> {
  const region = process.env.AWS_REGION || "ap-northeast-2"
  const bucket = process.env.AWS_S3_BUCKET
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

  if (!bucket || !accessKeyId || !secretAccessKey) {
    return []
  }

  try {
    const client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    })

    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: `jubo/${date}/`,
    })

    const response = await client.send(command)
    
    // 파일명이 있는 이미지 오브젝트(확장자 체크)만 필터링하여 풀 경로 생성
    const imageUrls = response.Contents?.map(item => {
      return item.Key || ""
    })
    .filter(key => {
      const lowerKey = key.toLowerCase()
      return (
        lowerKey.endsWith(".jpg") || 
        lowerKey.endsWith(".jpeg") || 
        lowerKey.endsWith(".png") || 
        lowerKey.endsWith(".webp")
      )
    })
    .map(key => {
      const cfDomain = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN || process.env.CLOUDFRONT_DOMAIN
      if (cfDomain) {
        const cleanDomain = cfDomain.replace(/\/$/, "")
        const cleanKey = key.replace(/^\//, "")
        return `https://${cleanDomain}/${cleanKey}`
      }
      return `https://${bucket}.s3.${region}.amazonaws.com/${key}`
    }) || []

    // 1.jpg, 2.jpg 등 파일명 자연 정렬
    return imageUrls.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
  } catch (err) {
    console.error(`S3 images load failed for ${date}:`, err)
    return []
  }
}

// 메타데이터 동적 생성
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { date } = await params
  const parts = date.split("-")
  let formattedDate = date
  if (parts.length === 3) {
    formattedDate = `${parseInt(parts[1], 10)}월 ${parseInt(parts[2], 10)}일`
  }
  return {
    title: `${formattedDate} 주보 - 부활교회`,
    description: `부활교회 ${formattedDate} 온라인 주보`,
  }
}

export default async function JuboDetailPage({ params }: PageProps) {
  const { date } = await params
  const imageUrls = await getJuboImages(date)
  
  // 타이틀 연월일 포맷팅
  const parts = date.split("-")
  let titleStr = date
  if (parts.length === 3) {
    titleStr = `${parts[0]}년 ${parseInt(parts[1], 10)}월 ${parseInt(parts[2], 10)}일 주보`
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      <main className="flex-1 max-w-[900px] w-full mx-auto px-4 py-8">
        {/* 상단 네비게이션 */}
        <div className="mb-6">
          <Link href="/jubo" className="inline-flex items-center gap-1 text-gray-600 hover:text-amber-600 transition-colors text-[14px]">
            <ChevronLeft className="w-4 h-4" />
            주보 목록으로 돌아가기
          </Link>
        </div>

        {/* 주보 이미지 뷰어 카드 */}
        <div className="bg-white p-6 sm:p-8 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 border-b pb-4 mb-6 text-center">
            {titleStr}
          </h2>

          <div className="flex flex-col gap-6 items-center">
            {imageUrls.length > 0 ? (
              imageUrls.map((url, i) => (
                <div key={i} className="w-full border border-gray-100 shadow-sm rounded overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`${titleStr} - 페이지 ${i + 1}`}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ))
            ) : (
              <div className="py-24 text-center">
                <p className="text-gray-500 mb-2">등록된 주보 이미지가 없거나 S3 자격 증명이 설정되지 않았습니다.</p>
                <p className="text-[13px] text-gray-400">S3 버킷 내의 `jubo/{date}/` 디렉토리 경로에 이미지 파일이 있는지 확인해 주세요.</p>
              </div>
            )}
          </div>
        </div>

        {/* 하단 네비게이션 */}
        <div className="mt-8 text-center">
          <Link href="/jubo" className="inline-flex items-center justify-center px-6 py-2.5 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:text-amber-600 transition-colors text-[14px] font-medium shadow-sm">
            목록보기
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
