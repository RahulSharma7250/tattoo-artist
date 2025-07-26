"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const phoneNumber = "919690239958" // with country code
  const defaultMessage = "Hi, I just visited your tattoo portfolio and I'm really impressed! I'd love to discuss a custom tattoo design. Can you help me out?"
  const encodedMessage = encodeURIComponent(defaultMessage)

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${encodedMessage}`}
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
