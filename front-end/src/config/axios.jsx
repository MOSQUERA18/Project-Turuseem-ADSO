import axios from "axios";

// Función para obtener el token del almacenamiento local
const getToken = () => localStorage.getItem('token');

// Crear una instancia de Axios
const clieteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`
});

// Agregar un interceptor para incluir el token en cada solicitud
clieteAxios.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default clieteAxios;
