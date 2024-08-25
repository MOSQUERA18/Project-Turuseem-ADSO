import { Outlet, Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";
import VerticalNav from "../components/verticalNav";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) {
    return (
      <>
        <h1 className="uppercase text-center font-bold">Cargando Pagina....</h1>
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <VerticalNav />
        <div className="w-full">
          <main className="flex-grow mx-10">
            {auth?.usuario?.Id_User || auth?.Id_User ? (
              <>
                <h1 className="text-stone-400 font-black text-4xl text-center mt-10">
                  Bienvenidos a{" "}
                  <span className="text-green-600">TURUSEEM</span>
                </h1>
                <Outlet />
              </>
            ) : (
              <Navigate to="/" />
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RutaProtegida;
