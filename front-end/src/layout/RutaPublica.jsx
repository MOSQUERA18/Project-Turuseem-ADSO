import { Outlet } from "react-router-dom";
import HeaderPublic from "../components/HeaderPublic.jsx";
const RutaPublica = () => {
  return (
    <>
      <div className="flex w-full flex-col">
        <HeaderPublic />
        <div className="mt-5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RutaPublica;
