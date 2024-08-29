import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";
import { ReactSession } from 'react-client-session';


const AuthContext = createContext()


const AuthProvider = ({children}) => {
    const [ cargando, setCargando ] = useState(true)
    const [ auth, setAuth ] = useState({})
    //  

    useEffect(() => {
        const autenticarUser = async () => {
            const session = ReactSession.get('session')
            if (!session) {
                setCargando(false)
                return
            }

            const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${session}`, 
                },
              };

            try {
                const url = `/api/user/perfil`
                const { data } = await clienteAxios(url, config)
                setAuth(data)
            } catch (error) {
                // ReactSession.remove('token')
                console.log(error.response.data.msg);
                setAuth({}) 
            }
            setCargando(false)
        }
        autenticarUser()
    }, [])

    const cerrarSesion = () => {
        ReactSession.remove('token')
        setAuth({})
    }
    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext