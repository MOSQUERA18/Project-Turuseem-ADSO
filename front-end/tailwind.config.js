/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html", "./src/**/*.jsx",
    "./src/**/*.{js,jsx,ts,tsx}",
    ".node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        green: {
          500: "#F3F4F6", //No cambiar
          600: "#60aefa",
          700: "#60aefa",
          800: "#303bff",
        },
        stone: {
          400: "#000000"
        },
        gray: {
          500: "#000000"
        },
      },
      textColor: {
        white: "#000000",
        blue: "#13109f"
      },
      border: {
         600: "#1b01ff"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

