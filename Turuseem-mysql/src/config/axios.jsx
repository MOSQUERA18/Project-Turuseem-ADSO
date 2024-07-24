import axios from "axios";
console.log(import.meta.env.VITE_BACKEND_URL)
const clieteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`
    
})

export default clieteAxios