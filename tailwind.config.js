/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // NOTE: Theme is managed via React state + inline conditional classes.
  // If you want to use `dark:` utility variants in the future,
  // set `darkMode: "class"` and toggle a "dark" class on <html>.
  theme: {
    extend: {
      colors: {
        primary: "#7c3aed", // purple-600
        accent: "#f59e0b",  // orange-500 / yellow-400
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.15)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-out",
      },
    },
  },
  plugins: [],
}
