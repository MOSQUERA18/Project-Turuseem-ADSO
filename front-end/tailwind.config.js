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
          300: "#030076", //Hover botones InicioSesion, BuscarTurnos, Modulos => Enviar, Agregar, DescargarCSV, ExportarExcel
          400: "#2f79ff", //Barra Nav Vertical Hover
          500: "#F3F4F6", //No cambiar Principal blanco+-
          600: "#2318ea", //Boton Enviar modulos
          700: "#2318ea", //Botono DescargarCSV modulos
        },
        stone: {
          400: "#000000"
        },
        gray: {
          800: "#455d88", //Boton modulos Seleccionar Archivo 
        },
      },  
      textColor: {
        stone: "#000000",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

