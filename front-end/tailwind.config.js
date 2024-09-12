/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "./src/**/*.jsx",
    "./src/**/*.{js,jsx,ts,tsx}",
    ".node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0ac2ff",
        green: {
          500: "#000000", //vertical - header
          600: "#2318ea", //Boton Enviar modulos
          700: "#2318ea", //Botono DescargarCSV modulos
        },
        stone: {
          400: "#000000",
        },
        gray: {
          500: "#000000",
          800: "#455d88", //Boton modulos Seleccionar Archivo
          600: "#000000",
        },
      },
      textColor: {
        black: "#ffffff",
        gray: "#ffffff",
      },
      borderColor: {
        green: "#ffffff"
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
