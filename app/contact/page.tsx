"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Instagram, Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"

export default function ContactPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    tattooStyle: "",
    description: "",
  })

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          tattooStyle: "",
          description: "",
        })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <source src="/backg.mp4" type="video/mp4" />
          <source src="/contact-bg.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]" />
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

      {/* Contact Section */}
      <section className="pt-24 pb-20 relative z-10">
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-[50px] transition-all duration-1000">
            <h1 className="text-6xl font-black mb-6 text-red-500 tracking-wider relative heading-text">
              GET INKED
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            </h1>
            <div className="w-20 h-1 bg-red-500 mx-auto mb-6" />
            <p className="text-xl text-gray-200 max-w-2xl mx-auto paragraph-text">
              Ready to start your tattoo journey? Let's discuss your vision and bring your ideas to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="scroll-reveal opacity-0 translate-x-[-50px] transition-all duration-1000">
              <div className="bg-black/40 backdrop-blur-sm border border-red-500/30 p-8 rounded-lg">
                <h2 className="text-3xl font-bold mb-8 text-red-500 tracking-wide heading-text">CONTACT INFO</h2>
                <div className="space-y-6 mb-12">
{[
  { icon: <Phone className="w-6 h-6" />, label: "Phone", text: "+919536586958"},
  { icon: <Mail className="w-6 h-6" />, label: "Email", text: "redritual.ink@gmail.com" },
  { icon: <MapPin className="w-6 h-6" />, label: "Address", text: "Pune" },
  { icon: <Clock className="w-6 h-6" />, label: "Hours", text: "Mon-Sat: 12PM-8PM" },
  { 
    icon: <Instagram className="w-6 h-6" />, 
    label: "Instagram", 
    text: "@redritual.ink",
    link: "https://instagram.com/redritual.ink" 
  },
].map((item, index) => (
  <div
    key={index}
    className="flex items-start space-x-4 text-gray-200 hover:text-red-500 transition-colors duration-300"
  >
    <div className="text-red-500 mt-1">{item.icon}</div>
    <div>
      <div className="text-white font-semibold mb-1 paragraph-text">{item.label}</div>
      {item.link ? (
        <a 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-lg paragraph-text hover:underline"
        >
          {item.text}
        </a>
      ) : (
        <div className="text-lg paragraph-text">{item.text}</div>
      )}
    </div>
  </div>
))}
                </div>

                {/* Studio Hours */}
                <div className="bg-black/50 border-2 border-red-500/30 p-6 relative group hover:border-red-500/60 transition-colors duration-300 rounded-lg">
                  <h3 className="text-xl font-bold text-red-500 mb-4 heading-text">STUDIO HOURS</h3>
                  <div className="space-y-2 text-gray-200 paragraph-text">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>12:00 PM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-red-500">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="scroll-reveal opacity-0 translate-x-[50px] transition-all duration-1000 delay-300">
              <Card className="bg-black/40 backdrop-blur-sm border-2 border-red-500/30 p-8 relative group hover:border-red-500/60 transition-colors duration-300">
                <h2 className="text-3xl font-bold mb-6 text-red-500 tracking-wide heading-text">BOOK CONSULTATION</h2>

                {/* Success/Error Messages */}
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-900/30 backdrop-blur-sm border border-green-500/30 rounded flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <p className="text-green-400 paragraph-text">
                      Message sent successfully! We'll get back to you soon.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-900/30 backdrop-blur-sm border border-red-500/30 rounded flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <p className="text-red-400 paragraph-text">
                      Failed to send message. Please try again or contact us directly.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2 paragraph-text">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Your first name"
                        required
                        className="w-full p-4 bg-black/50 backdrop-blur-sm border border-red-500/20 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors duration-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2 paragraph-text">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Your last name"
                        required
                        className="w-full p-4 bg-black/50 backdrop-blur-sm border border-red-500/20 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors duration-300 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2 paragraph-text">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      className="w-full p-4 bg-black/50 backdrop-blur-sm border border-red-500/20 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors duration-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2 paragraph-text">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="1234567890"
                      className="w-full p-4 bg-black/50 backdrop-blur-sm border border-red-500/20 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors duration-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2 paragraph-text">Tattoo Style</label>
                    <select
                      name="tattooStyle"
                      value={formData.tattooStyle}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-black/50 backdrop-blur-sm border border-red-500/20 text-white focus:border-red-500 focus:outline-none transition-colors duration-300 rounded"
                    >
                      <option value="">Select a style</option>
                      <option value="realism">Realism</option>
                      <option value="traditional">Traditional</option>
                      <option value="blackwork">Blackwork</option>
                      <option value="geometric">Geometric</option>
                      <option value="portrait">Portrait</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2 paragraph-text">
                      Describe Your Idea *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Tell me about your tattoo idea, size, placement, and any specific details..."
                      rows={4}
                      required
                      className="w-full p-4 bg-black/50 backdrop-blur-sm border border-red-500/20 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors duration-300 resize-none rounded"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 border-2 border-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed rounded"
                  >
                    {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                  </Button>
                </form>
              </Card>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-20 text-center scroll-reveal opacity-0 translate-y-[50px] transition-all duration-1000 delay-500">
            <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-6 heading-text">WHAT TO EXPECT</h3>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="group">
                  <div className="text-red-500 text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300 heading-text">
                    01
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 heading-text">Consultation</h4>
                  <p className="text-gray-200 paragraph-text">
                    We'll discuss your ideas, placement, and design preferences.
                  </p>
                </div>
                <div className="group">
                  <div className="text-red-500 text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300 heading-text">
                    02
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 heading-text">Design</h4>
                  <p className="text-gray-200 paragraph-text">I'll create a custom design based on our consultation.</p>
                </div>
                <div className="group">
                  <div className="text-red-500 text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300 heading-text">
                    03
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 heading-text">Tattoo Session</h4>
                  <p className="text-gray-200 paragraph-text">
                    We'll bring your vision to life in a comfortable, safe environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-red-500/20 bg-black/60 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <p className="text-gray-300 font-mono text-sm paragraph-text">© 2024 Red Ritual Ink. All rights reserved.</p>
          <Instagram className="w-5 h-5 text-gray-300 hover:text-red-500 transition-colors cursor-pointer" />
        </div>
      </footer>
    </div>
  )
}
