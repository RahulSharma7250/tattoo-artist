// import type React from "react"
// import type { Metadata } from "next"
// import "./globals.css"
// import {
//   Creepster,
//   Metal_Mania,
//   Black_Ops_One,
//   Butcherman, Inter, Poppins, Roboto, Open_Sans, Lato, 
// } from "next/font/google"

// // Google Fonts
// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-inter",
// })

// const poppins = Poppins({
//   weight: ["300", "400", "500", "600", "700"],
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-poppins",
// })

// const roboto = Roboto({
//   weight: ["300", "400", "500", "700"],
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-roboto",
// })

// const openSans = Open_Sans({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-open-sans",
// })

// const lato = Lato({
//   weight: ["300", "400", "700"],
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-lato",
// })
// const creepster = Creepster({
//   weight: "400",
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-creepster",
// })

// const metalMania = Metal_Mania({
//   weight: "400",
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-metal",
// })

// const blackOpsOne = Black_Ops_One({
//   weight: "400",
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-black-ops",
// })

// const butcherman = Butcherman({
//   weight: "400",
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-butcher",
// })

// export const metadata: Metadata = {
//   title: "Red Ritual Ink",
//   description: "Futuristic tattoo artist portfolio",
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html
//       lang="en"
//       className={`${creepster.variable} ${metalMania.variable} ${blackOpsOne.variable} ${butcherman.variable}`}
//     >
//       <body>{children}</body>
//     </html>
//   )
// }

import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Black_Ops_One, Inter, Poppins, Roboto, Open_Sans, Lato, Butcherman, Merriweather, Metal_Mania } from "next/font/google"
import { WhatsAppButton } from "@/components/whatsapp-button"

// Modern Professional Fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
})

const metalMania = Metal_Mania({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-metal",
})

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
})

// Keep the existing heading font
const blackOpsOne = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-black-ops",
})

// Add Butcherman font for navigation
const butcherman = Butcherman({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-butcher",
})

// Add Merriweather font
const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-merriweather",
})

export const metadata: Metadata = {
  title: "Red Ritual Ink",
  description: "Professional tattoo artist portfolio with modern design",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${roboto.variable} ${openSans.variable} ${lato.variable} ${blackOpsOne.variable} ${butcherman.variable} ${merriweather.variable} ${metalMania.variable}`}
    >
      <body>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
