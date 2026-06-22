import { Metadata } from "next"
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3"
import BulletinContent from "@/components/jubo-content"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "온라인 주보 - 부활교회",
  description: "부활교회 온라인 주보",
}

// 빌드 타임에 S3에서 주보 폴더 목록을 가져오는 함수
async function getJuboDates(): Promise<string[]> {
  const region = process.env.AWS_REGION || "ap-northeast-2";
  const bucket = process.env.AWS_S3_BUCKET;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  // AWS 자격 증명 또는 버킷이 없으면 빈 배열 반환하여 빌드 실패 방지
  if (!bucket || !accessKeyId || !secretAccessKey) {
    console.warn("⚠️ AWS S3 자격 증명 또는 버킷 이름이 설정되지 않았습니다. 빈 주보 목록으로 빌드를 진행합니다.");
    return [];
  }

  try {
    const client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: "jubo/", // jubo 폴더 안만 뒤지기
      Delimiter: "/",  // 하위 폴더 형태로 끊어서 가져오기
    });

    const response = await client.send(command);
    
    // CommonPrefixes 배열 안에 'jubo/2026-06-21/' 같은 폴더 명들이 들어옴
    const folders = response.CommonPrefixes?.map(p => {
      // 'jubo/2026-06-21/' 에서 날짜글자('2026-06-21')만 쏙 빼내는 작업
      return p.Prefix?.replace("jubo/", "").replace("/", "") || "";
    }).filter(Boolean) || [];

    // 최신 날짜가 맨 위로 오도록 역순 정렬!
    return folders.sort().reverse();
  } catch (err) {
    console.error("S3 리스트 로드 실패 (빌드가 빈 데이터로 완료됩니다):", err);
    return [];
  }
}

export default async function BulletinPage() {
  const dates = await getJuboDates();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-1 bg-white">
        <BulletinContent initialDates={dates} />
      </main>
      <Footer />
    </div>
  )
}