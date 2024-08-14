import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
// import logoTuruseem from "../assets/LOGOTURUSEEM.png"
import { IoLogOut,  IoHome  } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
// import { useState } from "react"


const Header = () => {
    const { cerrarSesion } = useAuth()
    return (
        <>
            <header className="py-4 bg-green-500">
                <div className="container flex pr-12 flex-col lg:flex-row justify-end">
                  <nav className="flex gap-5 lg:flex-row mt-5 lg:mt-0 items-center">
                    <Link to="/admin" className="text-white text-base uppercase font-bold"><IoHome size={22} title="Inicio"/></Link>
                    <Link to="/admin/perfil" className="text-white text-base uppercase font-bold"><FaUserCircle size={22} title="Perfil"/></Link>
                    <button type="button" onClick={cerrarSesion} className="text-white text-base uppercase font-bold h-16"><IoLogOut size={22} title="Cerrar Sesion"/></button>
                    {/* <Link to="aprendices" className="text-white text-base uppercase font-bold">Aprendices</Link>
                    <Link to="memorandos" className="text-white text-base uppercase font-bold">Memorandos</Link>
                    <Link to="programa-formacion" className="text-white text-base uppercase font-bold">Programa</Link>
                    <Link to="unidades"  className="text-white text-base uppercase font-bold">Unidades</Link> */}

                  </nav>
                </div>

            </header>

        </>
    )
}

export default Header
