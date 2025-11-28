"use client"

import { useRef } from "react"
import { VideoTextMask } from "./video-text-mask"
import { useHeroAnimation } from "@/hooks/use-hero-animation"
import Image from "next/image"

const centerImages = [
  "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1571847452822-fd7d3ca5d7b7?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1554080221-cbf7f9a928f2?w=400&h=500&fit=crop",
]

export const HeroAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  
  // Separation of Concerns: استدعاء المنطق من الـ Hook
  const { responsiveValues } = useHeroAnimation(containerRef, triggerRef)

  // Robustness: تجنب الـ Layout Shift
  if (!responsiveValues) return <div className="min-h-screen bg-black" />

  return (
    <div ref={containerRef} className="bg-black min-h-screen text-white" dir="rtl">
      {/* Fixed Header */}
      <div className="fixed-header fixed top-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-sm border-b border-white/10 z-[100] opacity-0 flex items-center justify-center">
        <span className="font-bold text-sm md:text-base lg:text-xl tracking-widest text-white/80">النسخة</span>
      </div>

      <div
        ref={triggerRef}
        className="h-screen w-full relative overflow-hidden flex flex-col items-center justify-center"
      >
        {/* Layer 1: The Mask Animation */}
        <div className="video-mask-wrapper absolute inset-0 z-50 bg-white">
          <VideoTextMask
            videoSrc="https://cdn.pixabay.com/video/2025/11/09/314880.mp4"
            text="النسخة"
            className="w-full h-full"
          />
        </div>

        {/* Layer 2: Main Text Content */}
        <div className="main-content-wrapper relative z-40 flex flex-col items-center justify-center text-center w-full h-full">
          <div className="text-content-wrapper flex flex-col items-center justify-center w-full gap-2 md:gap-3 lg:gap-4 z-50 p-4 md:p-6 lg:p-10 bg-black/20 backdrop-blur-sm rounded-2xl md:rounded-3xl border border-white/10">
            <h1 className="text-main text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-tight text-center w-full">
              بس اصلي
            </h1>
            <p className="text-dedication text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-dedication-color mt-2 md:mt-4 text-center w-full">
              اهداء ليسري نصر الله
            </p>
          </div>
        </div>

        {/* Layer 3: Floating Cards */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`p3-${i}`}
            className="phase-3-img absolute rounded-lg shadow-2xl overflow-hidden border border-white/20 z-30"
            style={{
              width: `${responsiveValues.cardWidth}px`,
              height: `${responsiveValues.cardHeight}px`,
              left: `${15 + i * 10}%`,
              top: "100%",
            }}
          >
            {i >= 1 && i <= 3 ? (
              <div className="relative w-full h-full">
                 {/* Performance: استخدام next/image للأداء */}
                 <Image
                  src={centerImages[i - 1] || "/placeholder.svg"}
                  alt={`Scene ${i}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority={true}
                />
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/0 border border-white/10" />
            )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-bounce text-white/50">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
