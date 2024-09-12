const HomePrivado = () => {
  return (
    <div className=" flex flex-col items-center justify-center p-4">
      <h1 className="text-zinc-950 font-extrabold text-4xl md:text-5xl text-center mb-8 " >
        Bienvenidos a <span className="text-blue-700">TURUSEEM</span>
      </h1>
      <br />

        <div className="bg-white p-6 md:p-8 rounded-lg  w-full max-w-md md:max-w-2xl">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">
            Módulos Disponibles
          </h2>
          <div className="p-5">
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-white p-4 rounded-lg shadow-lg min-w-max transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
                <h3 className="text-center text-lg font-semibold">Aprendices</h3>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg min-w-max transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
                <h3 className="text-center text-lg font-semibold">Turnos Especiales</h3>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg min-w-max transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
                <h3 className="text-center text-lg font-semibold">Turnos Rutinarios</h3>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg min-w-max transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
                <h3 className="text-center text-lg font-semibold">Memorandos</h3>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg min-w-max transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
                <h3 className="text-center text-lg font-semibold">Programas de Formación</h3>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg min-w-max transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
                <h3 className="text-center text-lg font-semibold">Unidades</h3>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg min-w-max transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100 ">
                <h3 className="text-center text-lg font-semibold">Fichas</h3>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg min-w-max transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
                <h3 className="text-center text-lg font-semibold">Funcionarios</h3>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg min-w-max transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
                <h3 className="text-center text-lg font-semibold">Talento Humano</h3>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg min-w-max transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100 ">
                <h3 className="text-center text-lg font-semibold ">Inasistencias</h3>
              </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePrivado;
