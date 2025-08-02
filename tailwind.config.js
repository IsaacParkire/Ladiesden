const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#E50914',
          light: '#FF3B3F',
          dark: '#B20710',
        },
        gold: {
          DEFAULT: '#FFD700',
          light: '#FFE84A',
          dark: '#BBA600',
        },
        black: {
          DEFAULT: '#000000',
          light: '#1a1a1a',
        },
      },
      fontFamily: {
        // Your custom fonts fallback to default sans
        sans: ["'Open Sans'", ...fontFamily.sans],
        display: ["'Playfair Display'", ...fontFamily.serif],
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};
