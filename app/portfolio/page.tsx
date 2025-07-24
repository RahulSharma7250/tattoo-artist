"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Instagram, Star } from "lucide-react"

export default function PortfolioPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(".scroll-reveal")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const portfolioItems = [
    { id: 1, category: "Realism", image: "/placeholder.svg?height=300&width=300&text=Realistic+Tattoo" },
    { id: 2, category: "Traditional", image: "/placeholder.svg?height=300&width=300&text=Traditional+Tattoo" },
    { id: 3, category: "Blackwork", image: "/placeholder.svg?height=300&width=300&text=Blackwork+Tattoo" },
    { id: 4, category: "Neo-Traditional", image: "/placeholder.svg?height=300&width=300&text=Neo+Traditional" },
    { id: 5, category: "Geometric", image: "/placeholder.svg?height=300&width=300&text=Geometric+Design" },
    { id: 6, category: "Portrait", image: "/placeholder.svg?height=300&width=300&text=Portrait+Tattoo" },
    { id: 7, category: "Japanese", image: "/placeholder.svg?height=300&width=300&text=Japanese+Style" },
    { id: 8, category: "Watercolor", image: "/placeholder.svg?height=300&width=300&text=Watercolor+Art" },
    { id: 9, category: "Minimalist", image: "/placeholder.svg?height=300&width=300&text=Minimalist+Design" },
  ]

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
          poster="/placeholder.svg?height=1080&width=1920"
        >
          <source src="/bg.mp4" type="video/mp4" />
          <source src="/portfolio-bg.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[0.5px]" />
      </div>

      {/* Custom Cursor */}
      <div
        className="fixed w-6 h-6 bg-red-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: "scale(1)",
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

      {/* Portfolio Section */}
      <section className="pt-24 pb-20 relative z-10">
        <div className="container mx-auto px-6 relative">
          {/* Background decorative elements */}
          <div className="absolute top-10 left-5 w-20 h-20 border border-red-500/10 transform rotate-45" />
          <div className="absolute bottom-10 right-5 w-16 h-16 border border-red-500/15 transform -rotate-12" />
          <div className="absolute top-1/2 left-10 w-2 h-2 bg-red-500/30 rounded-full" />
          <div className="absolute top-1/3 right-20 w-3 h-3 bg-red-500/20 transform rotate-45" />

          <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-[50px] transition-all duration-1000">
            <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-lg p-8 inline-block">
              <h1 className="text-6xl font-black mb-6 text-red-500 tracking-wider relative">
                PORTFOLIO
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
              </h1>
              <div className="w-20 h-1 bg-red-500 mx-auto mb-6" />
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                A collection of my finest work. Each piece tells a unique story and represents hours of dedication and
                artistry.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {portfolioItems.map((item, index) => (
              <Card
                key={item.id}
                className="group bg-black/40 backdrop-blur-sm border-red-500/30 overflow-hidden hover:border-red-500 transition-all duration-500 scroll-reveal opacity-0 translate-y-[50px] hover:shadow-lg hover:shadow-red-500/20"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden h-80 md:h-96">
                  {/* Corner accents */}
                  {/* <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 z-10" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 z-10" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300 z-10" /> */}

                  <Image
                    src={item.image || "/placeholder.svg?height=300&width=300&text=Tattoo"}
                    alt={`Tattoo ${item.category}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:contrast-110"
                    unoptimized
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Badge className="bg-red-600 text-white border-0 font-bold tracking-wider">{item.category}</Badge>
                  </div>

                  {/* Glitch effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 scroll-reveal opacity-0 translate-y-[50px] transition-all duration-1000 delay-500">
            <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-lg p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Create Your Own Masterpiece?</h3>
              <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
                Each tattoo in this portfolio represents a unique collaboration between artist and client. Let's work
                together to create something extraordinary for you.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-3 px-6 border-2 border-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 tracking-wide rounded"
              >
                BOOK CONSULTATION
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-red-500/20 bg-black/60 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <p className="text-gray-300 font-mono text-sm">© 2024 Red Ritual Ink. All rights reserved.</p>
          <Instagram className="w-5 h-5 text-gray-300 hover:text-red-500 transition-colors cursor-pointer" />
        </div>
      </footer>
    </div>
  )
}
