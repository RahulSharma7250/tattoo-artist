"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const phoneNumber = "8789264200" // Replace with actual number

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-red-600 text-white p-3 rounded-full shadow-lg z-40 border-2 border-white hover:bg-[#128C7E] transition-colors duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      data-cursor-hover
    >
      <MessageCircle className="w-5 h-5" />
    </motion.a>
  )
}