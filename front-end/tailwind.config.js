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
          500: "#F3F4F6",
          600: "#1C75BC",
          700: "#1C75BC",
          800: "#1A5E99",
        },
      },  
      textColor: {
        white: "#ffffff",
      },
      borderColor: {
        white: "#1C75BC"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

