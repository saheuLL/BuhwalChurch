import { X } from "lucide-react"

// 일정 데이터 - 1~3개까지 자유롭게 추가/삭제 가능
const eventsData = [
  {
    id: 1,
    title: ["호렙산 특별", "새벽기도회"],
    details: [
      "6월 29일(월) ~ 7월 26일(주일)",
      "새벽 4시 40분",
      "위기에서 건지심을 받으라 (시 50:15)",
    ],
  },
  {
    id: 2,
    title: ["2026 빌리그래함", "의정부 전도대회"],
    details: [
      "2026년 5월 17일",
      "의정부 종합운동장",
    ],
    link: {
      url: "https://ubgc.billygraham.or.kr/",
      text: "https://ubgc.billygraham.or.kr/",
    },
  },
  // 일정 추가 예시:
  // {
  //   id: 3,
  //   title: ["새로운 행사", "제목"],
  //   details: ["날짜", "장소", "기타 정보"],
  //   link: { url: "https://example.com", text: "링크 텍스트" }, // 선택사항
  // },
]

// 개별 이벤트 카드 컴포넌트
function EventCard({ event, totalCount }: { event: typeof eventsData[0]; totalCount: number }) {
  // 카드 개수에 따라 폰트 크기 조절 (모바일에서)
  const titleSize = totalCount >= 3 ? "text-[16px] sm:text-[25px]" : "text-[20px] sm:text-[25px]"
  const detailSize = totalCount >= 3 ? "text-[13px] sm:text-[20px]" : "text-[16px] sm:text-[20px]"

  return (
    <div className="text-center flex-1 min-w-0 px-2">
      {event.title.map((line, idx) => (
        <h3 key={idx} className={`${titleSize} font-bold text-gray-800 ${idx === event.title.length - 1 ? "mb-2 sm:mb-4" : "mb-1"}`}>
          {line}
        </h3>
      ))}
      {event.details.map((detail, idx) => (
        <p key={idx} className={`${detailSize} text-gray-600 mb-1`}>
          {detail}
        </p>
      ))}
      {event.link && (
        <a
          href={event.link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${detailSize} text-[#fcaa4c] hover:underline break-all`}
        >
          {event.link.text}
        </a>
      )}
    </div>
  )
}

export default function UpcomingEvents() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-[20px] sm:text-[25px] font-bold text-center text-gray-800 mb-4">
          다가오는 일정
        </h2>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-8 sm:mb-12">
          <div className="w-16 sm:w-20 h-px bg-gray-300" />
          <X className="w-4 h-4 text-gray-400" />
          <div className="w-16 sm:w-20 h-px bg-gray-300" />
        </div>

        {/* Events - 항상 가로 배열 (flex), 모바일에서도 유지 */}
        <div className="flex justify-center gap-4 sm:gap-8 max-w-[1000px] mx-auto">
          {eventsData.map((event) => (
            <EventCard key={event.id} event={event} totalCount={eventsData.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
