const leftServices = [
    { name: "주일 오전 예배", location: "2층 본당", time: "오전 11:00" },
    { name: "수요예배", location: "지하 예배실", time: "오후 8:00" },
    { name: "금요철야 기도회", location: "지하 예배실", time: "오후 8:00" },
    { name: "새벽기도회", location: "지하 예배실", time: "오전 4:40" },    
    { name: "화요 중보 기도회", location: "지하 예배실", time: "오후 8:00" },
  ]
  
  const rightServices = [
    { name: "주일 저녁 찬양 예배", location: "2층 본당", time: "오후 5:50" },
    { name: "아동부 예배", location: "1층 소예배실", time: "오전 11:00" },
    { name: "중고등부 예배", location: "2층 본당", time: "오전 11:00" },
    { name: "청년부 모임", location: "", time: "주일 예배 후" },
    
  ]
  
  function ServiceItem({ service }: { service: { name: string; location: string; time: string } }) {
    return (
      <div className="mb-7">
        <div className="flex justify-between items-start gap-5 mb-1.5">
          <h3 className="text-[19px] sm:text-[21px] font-bold text-gray-800 leading-snug">{service.name}</h3>
          <span className="text-[17px] sm:text-[19px] text-gray-600 whitespace-nowrap shrink-0 leading-snug">{service.time}</span>
        </div>
        <p className="text-[14px] sm:text-[15px] text-gray-500 mb-4 leading-relaxed">{service.location}</p>
        <div className="w-full h-px bg-gray-300" />
      </div>
    )
  }
  
  export default function WorshipContent() {
    return (
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[900px] mx-auto px-4 sm:px-8">
          {/* Title */}
          <div className="text-center mb-10 sm:mb-14">
            <h1 className="text-[26px] sm:text-[30px] font-bold text-gray-800 inline-block relative leading-tight">
              예배시간 안내
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#fcaa4c]" />
            </h1>
          </div>
  
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 lg:gap-x-24 gap-y-8 md:gap-y-0">
            {/* Left Column */}
            <div>
              {leftServices.map((service, index) => (
                <ServiceItem key={index} service={service} />
              ))}
            </div>
  
            {/* Right Column */}
            <div>
              {rightServices.map((service, index) => (
                <ServiceItem key={index} service={service} />
              ))}
            </div>
          </div>
  
          {/* Notice Section — accent border matches page highlight color */}
          <div className="mt-12 sm:mt-16 pt-9 border-t border-[#fcaa4c]">
            <div className="text-center space-y-3">
              <p className="text-[14px] sm:text-[16px] text-black leading-relaxed">
                *예배 시간 30분 전에 오셔서 기도로 준비하시고 찬양으로 하나님께 영광을 돌리시길 바랍니다
              </p>
              <p className="text-[14px] sm:text-[16px] text-black leading-relaxed">
                *예배시간동안 휴대폰 소리를 꺼주시면 더욱 은혜롭습니다
              </p>              
            </div>
          </div>
  
          {/* Bottom Divider */}
          <div className="mt-8 pt-8 border-t border-[#fcaa4c]" />
        </div>
      </section>
    )
  }