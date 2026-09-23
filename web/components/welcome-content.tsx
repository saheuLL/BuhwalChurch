import Image from "next/image"

export default function WelcomeContent() {
  const values = [
    { number: 1, text: "꿈이 있는 긍정적인 신앙" },
    { number: 2, text: "어린아이 같은 순수한 기도" },
    { number: 3, text: "고난을 극복하는 불굴의 의지" },
    { number: 4, text: "성령의 결정적인 체험" },
  ]

  // 그라데이션 색상 (파랑 -> 초록)
  const getGradient = (index: number) => {
    const gradients = [
      "from-[#4a9fd4] to-[#5bb5e0]", // 파란색
      "from-[#5bb5a0] to-[#6bc5a8]", // 청록색
      "from-[#7cc478] to-[#8cd488]", // 연두색
      "from-[#9cd46a] to-[#aae47a]", // 초록색
    ]
    return gradients[index] || gradients[0]
  }

  const identityList = [
    "부르짖어 기도하는 교회입니다",
    "성경 말씀대로 살아가는 교회입니다",
    "나라를 위해 기도하는 교회입니다",
  ]

  return (
    <div className="bg-white">
      {/* 1. 환영 말씀 & 성경 구절 섹션 */}
      <section className="pt-16 pb-12 px-4 bg-gradient-to-b from-amber-50/30 to-white">
        <div className="max-w-[1100px] mx-auto">
          {/* Bible Verse Quote */}
          <div className="flex items-start justify-center gap-3 md:gap-4 mb-2">
            {/* Left Quote Mark */}
            <span className="text-[#fcaa4c] text-[60px] md:text-[80px] leading-none font-serif select-none">"</span>
            
            <p className="text-center text-[20px] sm:text-[24px] md:text-[26px] text-gray-800 leading-relaxed font-bold pt-4 md:pt-6 max-w-[720px]">
              수고하고 무거운 짐 진 자들아 다 내게로 오라 <br />
              내가 너희를 쉬게 하리라
            </p>
            
            {/* Right Quote Mark */}
            <span className="text-[#fcaa4c] text-[60px] md:text-[80px] leading-none font-serif select-none">"</span>
          </div>
          
          {/* Bible Reference */}
          <p className="text-center text-[#fcaa4c] font-semibold text-[16px] md:text-[18px] mb-12 md:mb-16">
            마태복음 11:28
          </p>

          {/* 환영 인사 & 교회 건물 사진 (2 Column Layout) */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
            {/* Left Column - Welcome Text */}
            <div className="flex-1 w-full">
              {/* Welcome Title with Corner Brackets */}
              <div className="relative mb-8">
                {/* Top Left Corner */}
                <div className="absolute -top-3 -left-3 w-8 h-8 border-l-4 border-t-4 border-gray-400" />
                {/* Bottom Right Corner */}
                <div className="absolute -bottom-3 -right-3 w-8 h-8 border-r-4 border-b-4 border-gray-400" />
                
                <div className="py-6 px-4">
                  <h1 className="text-[26px] sm:text-[30px] md:text-[32px] font-bold text-gray-800 leading-snug">
                    부활교회 홈페이지에<br />
                    방문해 주신<br />
                    여러분을 환영합니다!
                  </h1>
                </div>
              </div>

              {/* Church Introduction Box */}
              <div className="border-l-4 border-[#fcaa4c] pl-6 py-4 bg-amber-50/20 rounded-r-lg">
                <p className="text-[16px] sm:text-[18px] text-gray-700 leading-relaxed">
                  경기도 의정부시 신곡2동에<br />
                  위치해 있는 부활교회는<br />
                  2007년에 처음 개척하여<br />
                  <span className="text-[#fcaa4c] font-bold">하나님의 크고 놀라우신 사랑과</span><br />
                  <span className="text-[#fcaa4c] font-bold">예수님의 십자가의 복음</span>을 전하고<br />
                  지역사회의 이웃들을 사랑으로 섬기는<br />
                  기독교대한감리회 소속의 교회입니다.
                </p>
              </div>
            </div>

            {/* Right Column - Church Photo */}
            <div className="flex-1 w-full max-w-[500px] lg:max-w-none">
              <div className="relative w-full aspect-[4/3] sm:aspect-[4/3.5] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <Image
                  src="/church.jpg"
                  alt="부활교회 건물"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 550px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 구분선 */}
      <div className="max-w-[1100px] mx-auto px-4">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* 2. 표어 섹션 */}
      <section className="py-14 px-4">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-between">
            {/* 왼쪽: 표어 텍스트 */}
            <div className="w-full md:w-[320px] flex-shrink-0">
              <div className="border-t-4 border-[#fcaa4c] w-16 mb-4" />
              <p className="text-[17px] md:text-[18px] font-medium text-gray-600 mb-1">
                2026년도 부활교회 표어
              </p>
              <h2 className="text-[28px] md:text-[32px] font-bold text-[#fcaa4c] leading-tight">
                영광이 더욱 충만한 교회
              </h2>
              <p className="text-[20px] md:text-[24px] font-bold text-[#fcaa4c] mt-2">
                학 2:7
              </p>
            </div>

            {/* 오른쪽: 표어 이미지 */}
            <div className="w-full flex justify-center md:justify-end md:flex-1">
              <div className="relative w-full max-w-[500px] h-[300px] sm:h-[350px] rounded-xl overflow-hidden shadow-md border border-gray-100">
                <Image
                  src="/Slogan.png"
                  alt="2026년도 부활교회 표어"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 부활교회는 (포스트잇 스타일) 섹션 */}
      <section className="py-14 px-4 bg-gradient-to-b from-amber-50/40 via-amber-50/20 to-white">
        <div className="max-w-[900px] mx-auto">
          {/* 타이틀 헤더 */}
          <div className="mb-8">
            <span className="text-[#fcaa4c] font-bold text-sm tracking-wider uppercase">
              Our Vision
            </span>
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-gray-800 mt-1">
              부활교회는
            </h2>
            <div className="w-14 h-1.5 bg-[#fcaa4c] rounded-full mt-2" />
          </div>

          {/* 포스트잇 카드 리스트 */}
          <div className="flex flex-col gap-4">
            {identityList.map((text, idx) => (
              <div
                key={idx}
                className="relative group bg-amber-100/60 hover:bg-amber-100/80 backdrop-blur-md border-l-[6px] border-[#fcaa4c] rounded-r-2xl p-5 md:p-6 shadow-[0_4px_16px_-4px_rgba(252,170,76,0.18)] hover:shadow-[0_8px_24px_-4px_rgba(252,170,76,0.28)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between"
              >
                {/* 상단 반투명 테이프 느낌 장식 (포스트잇 디테일) */}
                <div className="absolute -top-2 left-6 w-12 h-4 bg-white/70 backdrop-blur-sm border border-amber-200/50 rounded-sm shadow-xs transform -rotate-1 pointer-events-none" />

                <div className="flex items-center gap-4">
                  {/* 글머리 포인트 핀 / 불릿 */}
                  <div className="w-3 h-3 rounded-full bg-[#fcaa4c] shadow-xs group-hover:scale-125 transition-transform duration-200 shrink-0" />
                  
                  {/* 본문 텍스트 */}
                  <p className="text-[18px] md:text-[21px] font-bold text-gray-800 tracking-tight">
                    {text}
                  </p>
                </div>

                {/* 은은한 우측 화살표/아이콘 악센트 */}
                <div className="hidden sm:flex text-amber-500/70 group-hover:text-[#fcaa4c] group-hover:translate-x-1 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 네가지 영적가치 섹션 */}
      <section className="py-14 px-4">
        <div className="max-w-[900px] mx-auto">
          {/* 섹션 제목 */}
          <div className="mb-3">
            <span className="text-[#fcaa4c] font-bold text-sm tracking-wider uppercase">
              Core Values
            </span>
            <h2 className="text-[24px] md:text-[28px] font-bold text-gray-800 mt-1">
              부활교회 성도의 네가지 영적가치
            </h2>
          </div>
          <div className="w-full h-px bg-gray-200 mb-10" />

          {/* 가치 리스트 */}
          <div className="flex flex-col gap-4">
            {values.map((value, index) => (
              <div key={value.number} className="flex items-center group">
                {/* 번호 원 */}
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border-4 border-gray-200 group-hover:border-[#fcaa4c]/50 transition-colors flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                  <span className="text-[24px] md:text-[28px] font-bold text-gray-700">
                    {value.number}
                  </span>
                </div>

                {/* 그라데이션 바 */}
                <div 
                  className={`flex-1 h-12 md:h-14 bg-gradient-to-r ${getGradient(index)} -ml-7 rounded-r-full flex items-center pl-10 md:pl-12 shadow-sm group-hover:shadow-md transition-shadow`}
                >
                  <span className="text-[16px] md:text-[20px] font-bold text-white tracking-wide">
                    {value.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}