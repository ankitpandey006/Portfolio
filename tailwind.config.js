/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", // ✅ important (you are using theme toggle)
  theme: {
    extend: {
      colors: {
        primary: "#7c3aed", // purple-600 (for consistency)
        accent: "#f59e0b",  // yellow-400 / orange
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [],
}
