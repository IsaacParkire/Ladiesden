/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#FFD700",
      },
    },
    fontFamily: {
      sans: ["'Open Sans'", "sans-serif"],
      display: ["'Playfair Display'", "serif"],
    },
  },
  plugins: [],
};
