import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSession } from "react-client-session";

//ICONO DE INASISTENCIAS
import { GiNotebook } from "react-icons/gi";
//ICONO DE TALENTO HUMANO
import { GiHumanPyramid } from "react-icons/gi";

//Icons
import { BsFillPeopleFill } from "react-icons/bs";
import { IoDocumentText, IoSettings, IoLogOut } from "react-icons/io5";
import { PiNotebookFill } from "react-icons/pi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaClipboardCheck, FaPeopleGroup } from "react-icons/fa6";
import { MdAssignmentTurnedIn } from "react-icons/md";
import clienteAxios from "../config/axios.jsx";
import useAuth from "../hooks/useAuth.jsx";

const VerticalNav = () => {
  const [show, setShow] = useState(true);
  const [user, setUser] = useState(null); // Inicializa el estado del usuario como null

  const { cerrarSesion } = useAuth() // Uso el contexto para acceder a la función cerrarSesion

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = ReactSession.get("token");

        if (!token) {
          console.log("No se encontró token, redirigiendo al login.");
          return;
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const url = `/api/user/perfil`;
        const responseApi = await clienteAxios.get(url, config);

        if (responseApi.status === 200) {
          setUser(responseApi.data);
        } else {
          console.log(`Código de estado inesperado: ${responseApi.status}`);
        }
      } catch (error) {
        console.error(
          "Error al obtener el perfil de usuario:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchUserProfile();
  }, []);

  // Renderiza un loader o un mensaje de carga mientras `user` es null
  if (!user) {
    return <div>Cargando...</div>;
  }
  return (
    <div className="min-h-screen">
      <div className="bg-green-500 xl:hidden flex justify-between w-full p-6 items-center">
        <div className="flex justify-between items-center space-x-3">
          <img src="/Public/assets/LOGOTURUSEEM.png" className="w-12 drop-shadow-2xl" />
          <p className="text-2xl leading-6 text-white font-bold">TURUSEEM</p>
        </div>
        <div aria-label="toggler" className="flex justify-center items-center">
          <button
            aria-label="open"
            id="open"
            onClick={() => setShow(true)}
            className={`${show ? "hidden" : ""} focus:outline-none focus:ring-2`}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 12H20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 18H20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            aria-label="close"
            id="close"
            onClick={() => setShow(false)}
            className={`${show ? "" : "hidden"} focus:outline-none focus:ring-2`}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        id="Main"
        className={`${
          show ? "translate-x-0" : "-translate-x-full"
        } transform xl:translate-x-0 ease-in-out transition duration-500 flex justify-center items-start h-full w-full sm:w-64 bg-green-500 flex-col`}
      >
        <div className="hidden xl:flex justify-start p-6 items-center space-x-3">
          <img src="Public/assets/LOGOTURUSEEM.png" className="w-12 drop-shadow-2xl" />
          <p className="text-2xl leading-6 text-white font-bold">TURUSEEM</p>
        </div>
        <div className="flex flex-col justify-end items-center pl-4 w-full border-gray-700 border-b space-y-3 p-5">
          {[
            { to: "aprendices", label: "Aprendices", Icon: BsFillPeopleFill },
            { to: "turnos-especiales", label: "Turnos Especiales", Icon: MdAssignmentTurnedIn },
            { to: "turnos-rutinarios", label: "Turnos Rutinarios", Icon: MdAssignmentTurnedIn },
            { to: "memorandos", label: "Memorandos", Icon: IoDocumentText },
            { to: "programa-formacion", label: "Programa", Icon: PiNotebookFill },
            { to: "unidades", label: "Unidades", Icon: SiHomeassistantcommunitystore },
            { to: "fichas", label: "Fichas", Icon: FaClipboardCheck },
            { to: "funcionarios", label: "Funcionarios", Icon: FaPeopleGroup },
            { to: "talentohumano", label: "Talento Humano", Icon: GiHumanPyramid },
            { to: "inasistencias", label: "Inasistencias", Icon: GiNotebook },
          ].map(({ to, label, Icon }) => (
            <Link key={to} to={to} className="w-full">
              <button className="flex justify-start items-center w-full space-x-4 pl-3 py-2 focus:bg-green-600 text-white hover:bg-green-600 rounded border-y border-white">
                <Icon size={22} />
                <span className="text-white text-sm uppercase font-bold">{label}</span>
              </button>
            </Link>
          ))}
        </div>
        <div className="flex flex-col justify-between items-center h-full pb-6 px-6 w-full space-y-15 mt-3">
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-center items-center space-x-2">
              <div>
                <img className="rounded-full" src="/Public/assets/LOGOTURUSEEM.png" alt="avatar" />
              </div>
              <div className="flex justify-start flex-col items-start">
                <p className="cursor-pointer text-sm leading-5 text-white">
                  {user.usuario.Nom_User.split(" ")[1]}
                </p>
                <p className="cursor-pointer text-xs leading-3 text-gray-300">
                  {user.usuario.Cor_User.split(".")[0]}
                </p>
              </div>
            </div>
            <IoSettings size={45} className="text-white" />
          </div>
          {/* Botón de Cerrar Sesión */}
          <br />
          <br />
          <button
            onClick={cerrarSesion}
            className="flex justify-start items-center w-full space-x-4 pl-3 py-2 focus:outline-none text-white hover:bg-green-600 rounded border-y border-white"
          >
            <IoLogOut size={22} />
            <span className="text-white text-sm uppercase font-bold">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerticalNav;
