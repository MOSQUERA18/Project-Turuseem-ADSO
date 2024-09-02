const HomePrivado = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-black p-">
        <h1 className="text-black font-extrabold text-5xl text-center mb-8">
          Bienvenidos a <span className="text-green-500">TURUSEEM</span>
        </h1>
        <div className="flex flex-col items-center">
          <img
            src="/Public/assets/LOGOTURUSEEM.png"
            alt="Logo Turuseem"
            className="w-40 mb-8 drop-shadow-2xl"
          />
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-xl text-center">
            <h2 className="text-2xl font-semibold mb-4">
              En este aplicativo podrá encontrar módulos para la gestión de
              información de los siguientes módulos:
            </h2>
            <ul className="text-lg text-black space-y-2">
              <li>Aprendices</li>
              <li>Turnos Especiales</li>
              <li>Turnos Rutinarios</li>
              <li>Memorandos</li>
              <li>Programas de Formación</li>
              <li>Unidades</li>
              <li>Fichas</li>
              <li>Funcionarios</li>
              <li>Talento Humano</li>
              <li>Inasistencias</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default HomePrivado;
  