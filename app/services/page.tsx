"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Instagram, Star, Skull, Flame, Palette, Clock, Shield, Award } from "lucide-react"

export default function ServicesPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const services = [
    {
      icon: <Skull className="w-12 h-12" />,
      title: "Custom Tattoos",
      description: "Unique designs tailored to your vision and story, from concept to completion.",
      features: ["Personal consultation", "Custom design", "Multiple sessions if needed", "Aftercare guidance"],
    },
    {
      icon: <Flame className="w-12 h-12" />,
      title: "Cover-ups",
      description: "Transform old tattoos into stunning new artwork, seamlessly blending the past with the present.",
      features: ["Design assessment", "Color matching", "Strategic placement", "Complete transformation"],
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: "Touch-ups & Reworks",
      description: "Refresh and restore your existing tattoos, bringing new life to faded or aged pieces.",
      features: ["Color restoration", "Line enhancement", "Detail improvement", "Aging prevention"],
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: "Consultation",
      description: "Professional advice on design, placement, and tattoo care before you commit.",
      features: ["Design discussion", "Placement advice", "Size recommendations", "Timeline planning"],
    },
  ]

  const additionalServices = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexible Scheduling",
      description: "Evening and weekend appointments available to fit your busy lifestyle.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safety First",
      description: "Hospital-grade sterilization and single-use equipment for every session.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Aftercare Support",
      description: "Comprehensive aftercare instructions and ongoing support for healing.",
    },
  ]

  return (
    <div className="min-h-screen text-white relative overflow-hidden" suppressHydrationWarning>
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
          <source src="/backg.mp4" type="video/mp4" />
          <source src="/services-bg.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[0.5px]" />
      </div>

      {/* Custom Cursor - Hidden on touch devices */}
      {mounted && (
        <div
          className="fixed w-6 h-6 bg-red-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out hidden md:block"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
            transform: "scale(1)",
          }}
        />
      )}

      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-sm border-b border-red-500/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold">BACK</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="relative w-12 h-12">
              {" "}
              {/* Increased from w-8 h-8 to w-12 h-12 */}
              <Image
                src="/logo1.png"
                alt="Red Ritual Ink Logo"
                width={80} // Increased from 60 to 80
                height={80} // Increased from 60 to 80
                className="opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 relative">
          {/* Background decorative elements */}
          <div className="absolute top-20 left-10 w-28 h-28 border border-red-500/10 transform rotate-45" />
          <div className="absolute bottom-20 right-10 w-20 h-20 border border-red-500/15 transform -rotate-12" />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-red-500/30 transform rotate-45" />

          <div className="text-center mb-12 sm:mb-16 scroll-reveal opacity-0 translate-y-[50px] transition-all duration-1000">
            <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-lg p-4 sm:p-6 md:p-8 inline-block mx-4 sm:mx-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 text-red-500 tracking-wider relative">
                SERVICES
                <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
              </h1>
              <div className="w-12 sm:w-16 md:w-20 h-1 bg-red-500 mx-auto mb-4 sm:mb-6" />
              <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto px-4 sm:px-0">
                Professional tattoo services with uncompromising quality and safety standards.
              </p>
            </div>
          </div>

          {/* Main Services */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-16 sm:mb-20">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className="bg-black/40 backdrop-blur-sm border-2 border-red-500/30 p-4 sm:p-6 md:p-8 hover:border-red-500 transition-all duration-500 group scroll-reveal opacity-0 translate-y-[50px] hover:shadow-lg hover:shadow-red-500/20 rounded-lg relative"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Corner accents - responsive sizing */}
                <div className="absolute top-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-l-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-r-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
                <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-l-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200" />
                <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-r-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300" />

                <div className="text-red-500 mb-4 sm:mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">{service.icon}</div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-white tracking-wide text-center">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-200 mb-4 sm:mb-6 leading-relaxed text-center">
                  {service.description}
                </p>
                <ul className="space-y-1 sm:space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm sm:text-base text-gray-200 flex items-center">
                      <div className="w-2 h-2 bg-red-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* Additional Services */}
          <div className="mb-16 sm:mb-20">
            <div className="text-center mb-8 sm:mb-12 scroll-reveal opacity-0 translate-y-[50px] transition-all duration-1000">
              <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-lg p-4 sm:p-6 inline-block mx-4 sm:mx-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 text-white tracking-wider">
                  ADDITIONAL SERVICES
                </h2>
                <div className="w-12 sm:w-16 h-1 bg-red-500 mx-auto" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {additionalServices.map((service, index) => (
                <div
                  key={service.title}
                  className="text-center scroll-reveal opacity-0 translate-y-[50px] transition-all duration-1000 group bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-lg p-4 sm:p-6 hover:border-red-500/40 hover:bg-black/40"
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="text-red-500 mb-3 sm:mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="w-6 h-6 sm:w-8 sm:h-8">{service.icon}</div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{service.title}</h3>
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Information */}
          {/* <div className="bg-black/40 backdrop-blur-sm border-2 border-red-500/30 p-4 sm:p-6 md:p-8 mb-16 sm:mb-20 scroll-reveal opacity-0 translate-y-[50px] transition-all duration-1000 delay-500 relative group hover:border-red-500/60 rounded-lg mx-4 sm:mx-0">
            
            <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-t-4 border-l-4 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-t-4 border-r-4 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
            <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-b-4 border-l-4 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200" />
            <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-b-4 border-r-4 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300" />

            <h3 className="text-xl sm:text-2xl font-bold text-red-500 mb-4 sm:mb-6 text-center">PRICING INFORMATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Hourly Rates</h4>
                <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-200">
                  <li>• Small tattoos (1-2 hours): $150-200/hour</li>
                  <li>• Medium tattoos (3-5 hours): $200-250/hour</li>
                  <li>• Large tattoos (6+ hours): $250-300/hour</li>
                  <li>• Touch-ups (existing clients): $100-150/hour</li>
                </ul>
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">What's Included</h4>
                <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-200">
                  <li>• Initial consultation and design</li>
                  <li>• All equipment and materials</li>
                  <li>• Aftercare products and instructions</li>
                  <li>• Follow-up support during healing</li>
                </ul>
              </div>
            </div>
          </div> */}

          {/* Call to Action */}
          <div className="text-center scroll-reveal opacity-0 translate-y-[50px] transition-all duration-1000 delay-700">
            <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-lg p-4 sm:p-6 md:p-8 max-w-4xl mx-auto sm:mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Ready to Get Started?</h3>
              <p className="text-sm sm:text-base text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto px-2 sm:px-0">
                Book a consultation to discuss your tattoo ideas and get a personalized quote for your project.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm py-2 sm:py-3 px-4 sm:px-6 border-2 border-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 tracking-wide rounded"
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
