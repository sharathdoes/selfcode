import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class", // important
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  extend: {
    colors: {
      background: "#000000",
      foreground: "#ffffff",
      primary: "#1d4ed8", // blue, example
      "primary-foreground": "#ffffff",
      destructive: "#dc2626",
      secondary: "#6b7280",
      "secondary-foreground": "#ffffff",
      accent: "#facc15",
      "accent-foreground": "#000000",
      input: "#374151",
      ring: "#3b82f6",
    },
  },
},

  plugins: [],
}
export default config
