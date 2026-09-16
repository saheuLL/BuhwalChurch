"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    { src: "/Carousel1.png", alt: "Carousel 1" },
    { src: "/Carousel2.png", alt: "Carousel 2" },
    { src: "/Carousel3.png", alt: "Carousel 3" },
  ] as const
  const totalSlides = slides.length

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  return (
    <section className="w-full max-w-[1200px] mx-auto px-0 md:px-4 pt-0 md:pt-4 pb-2 md:pb-6">
      <div className="relative w-full aspect-[1920/800] md:rounded-2xl overflow-hidden shadow-none md:shadow-md bg-gray-100">
        {/* Slides */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-500 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={currentSlide !== index}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-11 md:h-11 flex items-center justify-center bg-white/70 hover:bg-white text-gray-700 rounded-full shadow transition-all backdrop-blur-sm"
          aria-label="이전 슬라이드"
        >
          <ChevronLeft className="w-5 h-5 md:w-7 md:h-7" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-11 md:h-11 flex items-center justify-center bg-white/70 hover:bg-white text-gray-700 rounded-full shadow transition-all backdrop-blur-sm"
          aria-label="다음 슬라이드"
        >
          <ChevronRight className="w-5 h-5 md:w-7 md:h-7" />
        </button>

        {/* Carousel indicators */}
        <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 md:h-2.5 rounded-full transition-all ${
                currentSlide === index ? "w-6 md:w-8 bg-white" : "w-2 md:w-2.5 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
