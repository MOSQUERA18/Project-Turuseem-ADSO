<<<<<<< HEAD

=======
import logoTuruseem from "../assets/LOGOTURUSEEM.png";
import logoSenaEmpresa from "../assets/SenaEmpresa.png";
>>>>>>> ad7e3251c2c6ea7beb91b9e6c0acc1d30657d8ea

const Home = () => {
  return (
    <>
      <h1 className="text-stone-400 font-black text-3xl sm:text-4xl text-center">
        Bienvenidos a <span className="text-green-600">TURUSEEM</span>
      </h1>
      <div className="flex flex-col sm:flex-row justify-evenly items-center mt-10 sm:mt-20">
<<<<<<< HEAD
        <img src="Public/assets/LOGOTURUSEEM.png" className="w-48 sm:w-64 mb-6 sm:mb-0" />
=======
        <img src={logoTuruseem} className="w-48 sm:w-64 mb-6 sm:mb-0" />
>>>>>>> ad7e3251c2c6ea7beb91b9e6c0acc1d30657d8ea
        <h2 className="text-center font-bold text-lg sm:text-xl px-4">
          Desarrollar e implementar un software para la gestión
          <br className="hidden sm:block" /> de turnos Sena Empresa del Centro
          Agropecuario “La Granja”
          <br className="hidden sm:block" /> Sena Regional Tolima
          <span className="text-green-600"> “TURUSEEM”</span>.
        </h2>
<<<<<<< HEAD
        <img src="Public/assets/LOGOSENAEMPRESA.png" className="w-48 sm:w-64 mt-6 sm:mt-0" />
=======
        <img src={logoSenaEmpresa} className="w-48 sm:w-64 mt-6 sm:mt-0" />
>>>>>>> ad7e3251c2c6ea7beb91b9e6c0acc1d30657d8ea
      </div>
    </>
  );
};

export default Home;
