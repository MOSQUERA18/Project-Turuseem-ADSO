import axios from "axios";

// Crear una instancia de Axios
const clieteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`
});
export default clieteAxios;
