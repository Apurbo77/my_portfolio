/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08070d",
        primary: "#6366f1", // Indigo
        accent: "#10b981", // Emerald
        neonPink: "#ff2e93",
        neonCyan: "#00f0ff",
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "sans-serif"],
      },
      boxShadow: {
        neonCyan: '0 0 15px rgba(0, 240, 255, 0.4)',
        neonPink: '0 0 15px rgba(255, 46, 147, 0.4)',
      }
    },
  },
  plugins: [],
}
