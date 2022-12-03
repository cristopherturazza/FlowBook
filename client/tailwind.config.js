/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Source Sans Pro", ...defaultTheme.fontFamily.sans],
      serif: ["Playfair Display", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        darkred: "#780000",
        scarletred: "#C1121F",
        sand: "#FEF9F1",
        darkblue: "#003049",
        lightblue: "#669BBC",
      },
    },
  },
  plugins: [require("daisyui")],
};
