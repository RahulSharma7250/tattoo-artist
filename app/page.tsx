"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Instagram, Volume2, VolumeX } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMuted, setIsMuted] = useState(false) // Start unmuted
  const videoRef = useRef<HTMLVideoElement>(null)

  // Mouse position tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Video autoplay handling
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const tryAutoplay = async () => {
      try {
        video.muted = false
        await video.play()
        setIsMuted(false)
        console.log("Autoplay with sound succeeded")
      } catch (err) {
        console.log("Autoplay with sound blocked, trying muted")
        video.muted = true
        await video.play()
        setIsMuted(true)
      }
    }

    tryAutoplay()

    // Try to unmute after user interaction
    const handleInteraction = () => {
      if (video.muted) {
        video.muted = false
        video.play().then(() => setIsMuted(false))
      }
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }

    document.addEventListener('click', handleInteraction)
    document.addEventListener('touchstart', handleInteraction)

    return () => {
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const handleVideoClick = () => {
    if (!videoRef.current) return
    videoRef.current.paused 
      ? videoRef.current.play().catch(e => console.log("Play failed:", e))
      : videoRef.current.pause()
  }

  const navigationItems = [
    { name: "HOME", href: "/", current: true },
    { name: "ABOUT", href: "/about" },
    { name: "PORTFOLIO", href: "/portfolio" },
    { name: "SERVICES", href: "/services" },
    { name: "CONTACT", href: "/contact" },
  ]

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Custom Cursor */}
      <div
        className="fixed w-4 h-4 bg-red-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: `${mousePosition.x - 8}px`,
          top: `${mousePosition.y - 8}px`,
        }}
      />

      {/* Fullscreen Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        muted={isMuted}
        onClick={handleVideoClick}
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source src="/tattoo-vid.mp4" type="video/mp4" />
        <source src="/tattoo-vid.webm" type="video/webm" />
      </video>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen">
        {/* Logo */}
        <div className="mb-8 w-32 h-32 relative">
          <Image
            src="/logo1.png"
            alt="Logo"
            width={128}
            height={128}
            className="object-contain"
            priority
          />
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-6 text-center">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block text-2xl font-bold tracking-widest transition-all hover:scale-110 font-metal ${
                item.current ? "text-red-500" : "text-white hover:text-red-500"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Bottom Bar */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-between items-center px-8">
          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="flex items-center gap-2 group"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white group-hover:text-red-500 transition-colors" />
            ) : (
              <Volume2 className="w-5 h-5 text-white group-hover:text-red-500 transition-colors" />
            )}
            <span className="text-xs font-mono hidden sm:inline">
              {isMuted ? "MUTED" : "UNMUTED"}
            </span>
          </button>

          {/* Instagram */}
          <a 
            href="https://instagram.com/yourprofile" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>

          {/* Copyright */}
          <div className="text-xs font-mono">© {new Date().getFullYear()}</div>
        </div>
      </div>
    </div>
  )
}