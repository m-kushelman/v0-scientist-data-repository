import type { Config } from "tailwindcss"

const config = {
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Spin custom colors
        spin: {
          navy: "#1E1E3F",
          orange: "#F2A640",
          coral: "#E85A4F",
          light: "#F9F9FB",
          sand: "#F5F3F0",
          gradient: {
            from: "#F2A640",
            to: "#E85A4F",
          },
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
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "spin-slow-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin-slow 20s linear infinite",
        "spin-slow-reverse": "spin-slow-reverse 20s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      backgroundImage: {
        "spin-gradient": "linear-gradient(to right, #F2A640, #E85A4F)",
        "section-warm": "linear-gradient(180deg, rgba(200,190,230,0.15) 0%, rgba(160,170,220,0.1) 12%, #ffffff 25%, #ffffff 30%, rgba(242,166,64,0.04) 70%, rgba(232,90,79,0.06) 100%)",
        "section-cool": "linear-gradient(180deg, rgba(200,190,230,0.15) 0%, rgba(160,170,220,0.1) 15%, #ffffff 25%, rgba(242,166,64,0.03) 50%, rgba(232,90,79,0.05) 100%)",
        "section-subtle": "linear-gradient(180deg, rgba(200,190,230,0.12) 0%, rgba(160,170,220,0.08) 40%, rgba(242,166,64,0.04) 70%, rgba(232,90,79,0.03) 100%)",
        "page-gradient": "linear-gradient(180deg, rgba(200,190,230,0.15) 0%, rgba(160,170,220,0.1) 20%, #ffffff 35%, rgba(242,166,64,0.03) 50%, rgba(232,90,79,0.04) 100%)",
        "card-footer": "linear-gradient(180deg, rgba(200,190,230,0.1) 0%, rgba(160,170,220,0.06) 40%, rgba(242,166,64,0.03) 70%, rgba(232,90,79,0.02) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
