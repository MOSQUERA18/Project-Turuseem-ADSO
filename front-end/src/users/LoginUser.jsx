import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";
import { ReactSession } from "react-client-session";

const LoginForm = () => {
  const [Cor_User, setCor_User] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([Cor_User, password].includes("")) {
      setAlerta({
        msg: "Todos los campos No deben de ir Vacios !",
        error: true,
      });
      return;
    }
    try {
      const url = `/api/user/login`;
      const { data } = await clienteAxios.post(url, {
        Cor_User: Cor_User,
        password: password,
      });
      ReactSession.set("token", data.token);

      //MANEJA EL ESTADO DE LA VERIFICACION DEL USUARIO
      setAuth(data);
      //SI ES CORRECTO EL TRY , SERA REDIRIGIDO A LA PAGINA PRINCIPAL LLAMADA '/login'
      navigate("/admin");
    } catch (error) {
      ReactSession.remove("token");
      localStorage.clear();
      // localStorage.removeItem("token");
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;
  return (
    <>
      <div className="container mx-auto md:grid md:grid-cols-2 gap-10 p-5 items-center">
        <div>
          <h1 className="text-stone-400 font-black text-5xl">
            Inicia Sesion y Gestiona {""}
            <span className="text-green-700">tus Turnos</span>
          </h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-2xl px-7 py-10 rounded-xl bg-white">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-stone-600 font-bold block text-xl">
                Correo:{" "}
              </label>
              <input
                type="email"
                className="border w-full p-2 mt-2 bg-gray-100 rounded-xl"
                placeholder="Aquí su Correo"
                value={Cor_User}
                onChange={(e) => setCor_User(e.target.value)}
              />
            </div>
            <div className="my-5">
              <label className="uppercase text-stone-600 font-bold block text-xl">
                Contraseña:
              </label>
              <input
                type="password"
                className="border w-full p-2 mt-2 bg-gray-100 rounded-xl"
                placeholder="Aquí su Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Iniciar Sesion"
              className="bg-green-800 w-full py-3 px-8 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-green-900 md:w-auto "
            />
          </form>
          <nav className="mt-8 lg:flex lg:justify-between">
            {/* <Link
              to="/registrar"
              className="block text-center my-5 text-gray-500"
            >
              ¿No tienes una Cuenta? Registrate
            </Link> */}
            <Link
              to="/olvide-password"
              className="block text-center my-5 text-gray-500 mx-2 hover:text-green-500 hover:scale-105 transition-transform duration-200 ease-in-out hover:rounded-md"
            >
              Olvide mi Contraseña
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};
export default LoginForm;