"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Instagram, Star, Skull, Flame, Palette, Clock, Shield, Award } from "lucide-react"
import Image from "next/image"

export default function ServicesPage() {
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
          <source src="/services-bg.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]" />
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
            <div className="relative w-12 h-12">
              <Image
                src="/logo1.png"
                alt="Red Ritual Ink Logo"
                width={80}
                height={80}
                className="opacity-80 hover:opacity-100 transition-opacity duration-300"
              />              
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="pt-24 pb-20 relative z-10">
        <div className="container mx-auto px-6 relative">
          {/* Background decorative elements */}
          <div className="absolute top-20 left-10 w-28 h-28 border border-red-500/10 transform rotate-45" />
          <div className="absolute bottom-20 right-10 w-20 h-20 border border-red-500/15 transform -rotate-12" />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-red-500/30 transform rotate-45" />

          <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-[50px] transition-all duration-1000">
            <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-lg p-8 inline-block">
              <h1 className="text-6xl font-black mb-6 text-red-500 tracking-wider relative">
                SERVICES
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
              </h1>
              <div className="w-20 h-1 bg-red-500 mx-auto mb-6" />
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                Professional tattoo services with uncompromising quality and safety standards.
              </p>
            </div>
          </div>

          {/* Main Services */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className="bg-black/40 backdrop-blur-sm border-2 border-red-500/30 p-8 hover:border-red-500 transition-all duration-500 group scroll-reveal opacity-0 translate-y-[50px] hover:shadow-lg hover:shadow-red-500/20 rounded-lg relative"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300" />

                <div className="text-red-500 mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white tracking-wide text-center">{service.title}</h3>
                <p className="text-gray-200 mb-6 leading-relaxed text-center">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-200 flex items-center">
                      <div className="w-2 h-2 bg-red-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* Additional Services */}
          <div className="mb-20">
            <div className="text-center mb-12 scroll-reveal opacity-0 translate-y-[50px] transition-all duration-1000">
              <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-lg p-6 inline-block">
                <h2 className="text-4xl font-black mb-6 text-white tracking-wider">ADDITIONAL SERVICES</h2>
                <div className="w-16 h-1 bg-red-500 mx-auto" />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {additionalServices.map((service, index) => (
                <div
                  key={service.title}
                  className="text-center scroll-reveal opacity-0 translate-y-[50px] transition-all duration-1000 group bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-lg p-6 hover:border-red-500/40 hover:bg-black/40"
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="text-red-500 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-200 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center scroll-reveal opacity-0 translate-y-[50px] transition-all duration-1000 delay-500">
            <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-lg p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
              <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
                Book a consultation to discuss your tattoo ideas and get a personalized quote for your project.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 border-2 border-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 tracking-wide rounded text-sm"
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