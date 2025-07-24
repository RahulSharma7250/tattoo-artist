// -----------------------------------------------------------------------------
// next-lite fix – @nodelib/fs.scandir expects a semver in process.versions.node
// The browser polyfill leaves it blank (""), which breaks fast-glob.
// -----------------------------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (typeof process !== "undefined" && process?.versions && !process.versions.node) {
  // Provide a harmless semver string so semver.parse() succeeds.
  // Use the current LTS value; tweak if you’re on something else.
  ;(process as any).versions.node = "20.11.1"
}
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#dc2626",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#000000",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#1f1f1f",
          foreground: "#a3a3a3",
        },
        accent: {
          DEFAULT: "#dc2626",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#000000",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#000000",
          foreground: "#ffffff",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        creepster: ["var(--font-creepster)", "cursive"],
        metal: ["var(--font-metal)", "cursive"],
        butcher: ["var(--font-butcher)", "cursive"],
        blackOpsOne: ["var(--font-black-ops)", "cursive"],
        // New paragraph fonts
        inter: ["var(--font-inter)", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
