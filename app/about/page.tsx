"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Instagram, Star } from "lucide-react"

export default function AboutPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Throttled mouse move for better performance
  useEffect(() => {
    let animationFrame: number
    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      animationFrame = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  // Optimized intersection observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(".scroll-reveal")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background Video */}
      <div className="fixed inset-0 w-full h-full z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/backg.mp4" type="video/mp4" />
          <source src="/bg.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]" />

        {/* Optional: Video controls overlay */}
        <div className="absolute bottom-4 right-4 z-10">
          <button
            onClick={(e) => {
              const video = e.currentTarget.parentElement?.parentElement?.querySelector("video")
              if (video) {
                if (video.paused) {
                  video.play()
                } else {
                  video.pause()
                }
              }
            }}
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200"
            aria-label="Toggle video playback"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Optimized Custom Cursor */}
      <div
        className="fixed w-4 h-4 bg-red-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-75 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
      />

      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-sm border-b border-red-500/20">
  <div className="container mx-auto px-6 py-4 flex items-center justify-between">
    <Link href="/" className="flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors">
      <ArrowLeft className="w-5 h-5" />
      <span className="font-bold">BACK</span>
    </Link>
    <div className="flex items-center space-x-2">
      <div className="relative w-12 h-12"> {/* Increased from w-8 h-8 to w-12 h-12 */}
        <Image
          src="/logo1.png"
          alt="Red Ritual Ink Logo"
          width={80}  // Increased from 60 to 80
          height={80} // Increased from 60 to 80
          className="opacity-80 hover:opacity-100 transition-opacity duration-300"
        />              
      </div>
    </div>
  </div>
</header>

      {/* About Section */}
      <section className="pt-24 pb-20 relative z-10">
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-[30px] transition-all duration-800">
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-red-500 tracking-wider relative">
              THE ARTIST
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            </h1>
            <div className="w-16 h-1 bg-red-500 mx-auto mb-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal opacity-0 translate-x-[-30px] transition-all duration-800">
              <div className="relative group max-w-sm mx-auto">
                <div className="relative overflow-hidden  transition-all duration-300">
                  <Image
                    src="/artist.jpg?height=400&width=280"
                    alt="Dharmendra Singh - Tattoo Artist"
                    width={280}
                    height={400}
                    className="w-full h-auto object-cover transition-all duration-300"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="scroll-reveal opacity-0 translate-x-[30px] transition-all duration-800 delay-200">
              <h2 className="text-3xl font-black mb-6 text-white tracking-wider">DHARMENDRA SINGH</h2>
              <div className="w-12 h-1 bg-red-500 mb-6" />
               <p className="text-base mb-6 text-gray-200 leading-relaxed">
    I am <span className="text-red-500 font-bold">Dharmendra Singh</span>, a passionate tattoo artist who has been honing my craft professionally for the past year. 
    In this short but intensive time, I've developed a distinctive style and approach to creating meaningful custom tattoos that perfectly capture my clients' visions.
  </p>
  <p className="text-base mb-6 text-gray-200 leading-relaxed">
    My artistic journey began long before my professional career, with years of dedicated drawing and design practice. This solid foundation has allowed me to rapidly develop my tattooing skills, mastering various techniques from bold traditional work to delicate fine-line pieces.
  </p>
  <p className="text-base mb-8 text-gray-200 leading-relaxed">
   Each tattoo is a sacred ritual - transforming your vision into lasting art with the highest standards of safety and precision.
  </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Custom Designs",
                  "Sterile Environment",
                  "Client-Focused",
                  
                ].map((badge) => (
                  <Badge
                    key={badge}
                    variant="outline"
                    className="border-red-500 text-red-500 px-3 py-1 text-xs font-semibold hover:bg-red-500 hover:text-black transition-colors duration-200"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="mt-16 scroll-reveal opacity-0 translate-y-[30px] transition-all duration-800 delay-300">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-red-500 mb-4 tracking-wider">MY PHILOSOPHY</h3>
              <div className="w-12 h-1 bg-red-500 mx-auto mb-6" />
            </div>
            <div className="max-w-3xl mx-auto text-center bg-black/30 backdrop-blur-sm rounded-lg p-8 border border-red-500/20">
              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                "Tattooing is not just about creating beautiful art on skin. It's about understanding the person behind
                the canvas, their story, their dreams, and their journey. Each tattoo I create is a collaboration
                between artist and client, resulting in a piece that is truly unique and meaningful."
              </p>
              <p className="text-base text-gray-300 italic">- Dharmendra Singh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-red-500/20 bg-black/60 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <p className="text-gray-300 font-mono text-sm">© 2024 Red Ritual Ink. All rights reserved.</p>
          <Instagram className="w-4 h-4 text-gray-300 hover:text-red-500 transition-colors cursor-pointer" />
        </div>
      </footer>
    </div>
  )
}
