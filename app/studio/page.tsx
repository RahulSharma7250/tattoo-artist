"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Instagram, Star } from "lucide-react"

export default function StudioPage() {
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

  return (
    <div className="min-h-screen night-sky-bg text-white">
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
      <header className="fixed top-0 w-full z-40 bg-black/90 backdrop-blur-md border-b border-red-500/30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold">BACK</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 border border-red-500 rounded-full animate-spin-slow" />
              <div className="absolute inset-1 bg-red-500 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white fill-white" />
              </div>
            </div>
            <span className="text-red-500 font-bold tracking-wider">RED RITUAL INK</span>
          </div>
        </div>
      </header>

      {/* Studio Section */}
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-6 relative">
          {/* Background decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 border border-red-500/10 transform rotate-45" />
          <div className="absolute bottom-20 right-10 w-24 h-24 border border-red-500/15 transform -rotate-12" />
          <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-red-500/20 transform rotate-45" />

          <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-[50px] transition-all duration-1000">
            <h1 className="text-6xl font-black mb-6 text-red-500 tracking-wider relative">
              THE STUDIO
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            </h1>
            <div className="w-20 h-1 bg-red-500 mx-auto mb-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div className="scroll-reveal opacity-0 translate-x-[-50px] transition-all duration-1000">
              <h2 className="text-4xl font-black mb-6 text-white tracking-wider">RED RITUAL INK STUDIO</h2>
              <div className="w-16 h-1 bg-red-500 mb-6" />
              <p className="text-lg mb-6 text-gray-300 leading-relaxed">
                Step into Red Ritual Ink - a space designed for creativity, comfort, and precision. My private studio
                offers a serene and sterile environment where your tattoo journey begins.
              </p>
              <p className="text-lg mb-6 text-gray-300 leading-relaxed">
                Located in the heart of the art district, the studio features state-of-the-art equipment, comfortable
                seating areas, and an atmosphere that promotes both relaxation and artistic inspiration.
              </p>
              <p className="text-lg mb-8 text-gray-300 leading-relaxed">
                Equipped with the latest tattoo technology and adhering to the highest hygiene standards, I ensure a
                safe and exceptional experience for every client. Your comfort and safety are my top priorities.
              </p>
              <div className="flex flex-wrap gap-4">
                {["Private Sessions", "Modern Equipment", "Strict Hygiene", "Comfortable Space", "Art Gallery"].map(
                  (badge) => (
                    <Badge
                      key={badge}
                      variant="outline"
                      className="border-red-500 text-red-500 px-4 py-2 text-sm font-semibold hover:bg-red-500 hover:text-black transition-colors"
                    >
                      {badge}
                    </Badge>
                  ),
                )}
              </div>
            </div>

            <div className="scroll-reveal opacity-0 translate-x-[50px] transition-all duration-1000 delay-300">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-red-500/30 via-red-600/20 to-red-700/10 transform rotate-1 group-hover:rotate-2 transition-transform duration-500" />
                <div className="absolute -inset-2 bg-gradient-to-tl from-red-400/20 via-transparent to-red-500/15 transform -rotate-1 group-hover:-rotate-2 transition-transform duration-700" />

                <div className="relative overflow-hidden bg-black border-2 border-red-500/30 group-hover:border-red-500/60 transition-all duration-500">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300" />

                  <Image
                    src="/placeholder.svg?height=500&width=400"
                    alt="Red Ritual Ink Studio Interior"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover filter group-hover:contrast-110 group-hover:brightness-105 transition-all duration-500"
                  />

                  {/* Glitch effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>
            </div>
          </div>

          {/* Studio Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: "Sterile Environment",
                description:
                  "Hospital-grade sterilization equipment and single-use needles ensure the highest safety standards.",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Comfortable Space",
                description:
                  "Relaxing atmosphere with comfortable seating and ambient lighting to ease any nervousness.",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Professional Equipment",
                description: "Top-of-the-line tattoo machines and premium inks for the best possible results.",
                image: "/placeholder.svg?height=300&width=400",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="scroll-reveal opacity-0 translate-y-[50px] transition-all duration-1000"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-black border-2 border-red-500/30 overflow-hidden hover:border-red-500 transition-colors duration-300 group">
                  <div className="relative overflow-hidden">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 z-10" />

                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 bg-gradient-to-b from-gray-900 to-black">
                    <h3 className="text-xl font-bold text-red-500 mb-3">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center scroll-reveal opacity-0 translate-y-[50px] transition-all duration-1000 delay-500">
            <h3 className="text-2xl font-bold text-white mb-4">Experience the Red Ritual Ink Difference</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Visit our studio and see why clients choose Red Ritual Ink for their tattoo journey. Book a consultation
              to discuss your ideas in person.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 border-2 border-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 tracking-wide"
            >
              SCHEDULE VISIT
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-red-500/30 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <p className="text-gray-400 font-mono text-sm">© 2024 Red Ritual Ink. All rights reserved.</p>
          <Instagram className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer" />
        </div>
      </footer>
    </div>
  )
}
