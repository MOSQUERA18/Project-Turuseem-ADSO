import logoTuruseem from "../assets/LOGOTURUSEEM.png";
import logoSenaEmpresa from "../assets/LOGOSENAEMPRESA.png";

const Home = () => {
  return (
    <>
      <h1 className="text-stone-400 font-black text-4xl text-center">
        Bienvenidos a <span className="text-green-600">TURUSEEM</span>
      </h1>
      <div className="flex justify-evenly items-center mt-20">
        <img src={logoTuruseem} className="w-64" />
        <h2 className="text-wrap text-center font-bold text-xl">
          Desarrollar e implementar un software para la gestión
          <br /> de turnos Sena Empresa del Centro Agropecuario “La Granja”
          <br />  Sena Regional Tolima “TURUSEEM”.
        </h2>
        <img src={logoSenaEmpresa} className="w-64" />
      </div>
    </>
  );
};

export default Home;
