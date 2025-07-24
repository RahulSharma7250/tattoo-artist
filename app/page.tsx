"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Instagram, Volume2, VolumeX } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Mouse position tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Video initialization and seamless loop handling
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Configure video for seamless playback
    video.muted = false
    video.loop = true

    // Workaround for Chrome's audio context restrictions
    const handleFirstInteraction = () => {
      video.play().catch(e => console.log("Playback attempt:", e))
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }

    // Attempt initial play
    const playPromise = video.play()

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // If autoplay fails, set up interaction listeners
        document.addEventListener('click', handleFirstInteraction)
        document.addEventListener('touchstart', handleFirstInteraction)
      })
    }

    // Seamless loop technique to prevent audio gaps
    const handleTimeUpdate = () => {
      // When 0.5 seconds from end, restart immediately
      if (video.currentTime > video.duration - 0.5) {
        video.currentTime = 0
        video.play().catch(e => console.log("Loop playback error:", e))
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
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

      {/* Video Background with seamless loop */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={false}
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
        preload="auto" // Ensure full video loads
      >
        <source src="/tattoo-vid.mp4" type="video/mp4" />
        <source src="/tattoo-vid.webm" type="video/webm" />
      </video>

      {/* Rest of your component remains the same */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen">
        <div className="mb-8 w-32 h-32 relative">
          <Image
            src="/logo1.png"
            alt="Red Ritual Ink Logo"
            width={128}
            height={128}
            className="object-contain"
            priority
          />
        </div>

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

        <div className="absolute bottom-8 left-0 right-0 flex justify-between items-center px-8">
          <button
            onClick={toggleMute}
            className="flex items-center gap-2 group"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white group-hover:text-red-500" />
            ) : (
              <Volume2 className="w-5 h-5 text-white group-hover:text-red-500" />
            )}
            <span className="text-xs font-mono">
              {isMuted ? "MUTED" : "UNMUTED"}
            </span>
          </button>

          <a href="#" className="hover:text-red-500 transition-colors">
            <Instagram className="w-5 h-5" />
          </a>

          <div className="text-xs font-mono opacity-0">© 2024</div>
        </div>
      </div>
    </div>
  )
}