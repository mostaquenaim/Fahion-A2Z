/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        luxurious: "'Luxurious Roman', serif",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["luxury","light","dark","cupcake"],
  },

}