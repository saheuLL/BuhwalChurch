'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    naver: any;
  }
}

export default function LocationContent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapScriptLoaded, setIsMapScriptLoaded] = useState(false);

  useEffect(() => {
    // 이미 스크립트가 로드되어 있는 경우를 대비한 처리
    if (window.naver && !isMapScriptLoaded) {
      setIsMapScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isMapScriptLoaded || !mapRef.current || !window.naver) return;

    // React Strict Mode 등에서 중복 렌더링되는 현상 방지하기 위해 컨테이너 초기화
    mapRef.current.innerHTML = '';

    // 부활교회 좌표 (위도: 37.746177, 경도: 127.065215)
    const churchLatLng = new window.naver.maps.LatLng(37.746177, 127.065215);

    const mapOptions = {
      center: churchLatLng,
      zoom: 18, //1~22
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT,
      },
    };

    const map = new window.naver.maps.Map(mapRef.current, mapOptions);

    // 마커 추가
    const marker = new window.naver.maps.Marker({
      position: churchLatLng,
      map: map,
      title: "부활교회",
    });

    // 정보창 추가
    const infoWindow = new window.naver.maps.InfoWindow({
      content: `
        <div style="padding: 10px; min-width: 150px; text-align: center; font-family: sans-serif;">
          <h4 style="margin: 0 0 5px 0; font-weight: bold; font-size: 14px; color: #000;">부활교회</h4>
          <p style="margin: 0; font-size: 11px; color: #666;">경기도 의정부시 추동로92번길 29</p>
        </div>
      `,
      borderWidth: 1,
      anchorSize: new window.naver.maps.Size(10, 10),
      pixelOffset: new window.naver.maps.Point(0, -10),
    });

    infoWindow.open(map, marker);

    const clickListener = window.naver.maps.Event.addListener(marker, "click", () => {
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(map, marker);
      }
    });

    // cleanup
    return () => {
      if (window.naver && window.naver.maps && window.naver.maps.Event) {
        window.naver.maps.Event.removeListener(clickListener);
      }
    };
  }, [isMapScriptLoaded]);

  return (
    <section className="py-12 px-4 sm:px-8 lg:px-16">
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        strategy="afterInteractive"
        onLoad={() => setIsMapScriptLoaded(true)}
      />

      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column - Address & Info */}
          <div className="flex-1 space-y-8">
            {/* 도로명 주소 */}
            <div>
              <h2 className="text-[24px] font-bold text-black mb-2">
                도로명 주소
              </h2>
              <p className="text-[18px] text-black">
                경기도 의정부시 추동로 92번길 29 (11719)
              </p>
            </div>

            {/* 지번주소 */}
            <div>
              <h2 className="text-[24px] font-bold text-black mb-2">
                지번주소
              </h2>
              <p className="text-[18px] text-black">
                신곡동 112-13
              </p>
            </div>

            {/* 오시는 길 */}
            <div>
              <h2 className="text-[24px] font-bold text-black mb-4">
                오시는 길
              </h2>
              <div className="space-y-3 text-[16px] text-black">
                <p>
                  <span className="font-semibold">의정부 경전철(ULINE):</span> 새말역에서 도보로 약 10분
                </p>
                <p>
                  <span className="font-semibold">의정부 시내에서 오는 버스:</span> 1-1, 11, 72-1, 72-3, 202-1, 206
                </p>
                <p className="pl-4">
                  <span className="font-semibold">경기 버스:</span> G6000
                </p>
                <p className="pl-4 text-black">
                  (의정부 우체국에서 하차 후 도보로 약 3분)
                </p>
              </div>

              <div className="mt-6 space-y-2 text-[16px]">
                <p className="text-black">
                  <span className="font-semibold">자가용:</span> 의정부 우체국 약 100m 위쪽에 위치해 있습니다.
                </p>
                <p className="text-black pl-12">
                  주차장이 있어 주차도 가능합니다.
                </p>
              </div>
            </div>

            {/* 문의전화 */}
            <div>
              <h2 className="text-[24px] font-bold text-black mb-2">
                문의전화
              </h2>
              <p className="text-[18px] text-black">
                T. 031-877-4333
              </p>
              <p className="text-[18px] text-black">
                인스타 DM으로 문의도 가능합니다.
              </p>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="flex-1 min-h-[400px] lg:min-h-[500px] relative rounded-lg overflow-hidden border border-gray-200">
            <div ref={mapRef} className="w-full h-full min-h-[400px] lg:min-h-[500px]" />
          </div>
        </div>
      </div>
    </section>
  );
}