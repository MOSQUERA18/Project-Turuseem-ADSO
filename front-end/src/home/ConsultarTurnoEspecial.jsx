import { useState } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const URI = "/turnoespecial/consulta";

const ConsultarTurnoEspecial = () => {
  const [alerta, setAlerta] = useState({});
  const [Id_Ficha, setId_Ficha] = useState("");
  const [turnoEspecialList, setTurnoEspecialList] = useState([]);

  const sendForm = async (e) => {
    e.preventDefault();
    try {
      const respuestApi = await clienteAxios(`${URI}/${Id_Ficha}`);
      if (respuestApi.status === 200) {
        setTurnoEspecialList(respuestApi.data);
        clearForm();
      } else {
        setAlerta({
          msg: `Error al cargar los registros!`,
          error: true,
        });
      }
    } catch (error) { 
      setTurnoEspecialList({});
      setAlerta({
        msg: error.response.data.message,
        error: true,
      });
    }
  };

  const clearForm = () => {
    setId_Ficha("");
  };

  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-center items-center mb-7 content-center w-full px-4 md:px-0">
        <form
          id="turnoRutinarioForm"
          onSubmit={sendForm}
          className="bg-white shadow-lg rounded-2xl px-6 pt-6 pb-8 mb-4 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mt-10"
        >
          {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
          <h1 className="font-bold text-black text-2xl sm:text-4xl uppercase text-center my-5">
            Consultar <span className="text-blue-600">Turnos Especiales</span>
          </h1>
          <div className="mb-3">
            <label className="text-black uppercase font-bold">
              Ingrese Numero de Ficha
            </label>
            <input
              type="number"
              id="document"
              value={Id_Ficha}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 8) {
                  setId_Ficha(value);
                }
              }}
              className="w-full p-2 border rounded"
              maxLength={8}
            />
          </div>
          <div className="flex justify-around">
            <input
              type="submit"
              id="button"
              value="Buscar"
              className="bg-green-700 w-full py-2 px-8 rounded-xl text-white mt-2 uppercase font-bold hover:cursor-pointer hover:bg-green-300 md:w-auto"
            />
          </div>
        </form>
      </div>
      {turnoEspecialList.length > 0 ? (
        <div className="px-4 sm:px-10 md:px-20">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-center text-sm">
              <thead className="text-black bg-green-500">
                <tr>
                  <th className="py-2 px-4 border-2 border-gray-500">
                    Numero Ficha
                  </th>
                  <th className="py-2 px-4 border-2 border-gray-500">
                    Fecha Turno Especial
                  </th>
                  <th className="py-2 px-4 border-2 border-gray-500">
                    Hora Inicio
                  </th>
                  <th className="py-2 px-4 border-2 border-gray-500">
                    Hora Fin
                  </th>
                  <th className="py-2 px-4 border-2 border-gray-500">
                    Documento de Instructor de Acompañamiento
                  </th>
                  <th className="py-2 px-4 border-2 border-gray-500">
                    Nombre Instructor de Acompañamiento del Turno
                  </th>
                  <th className="py-2 px-4 border-2 border-gray-500">
                    Nombre Unidad
                  </th>
                </tr>
              </thead>
              <tbody>
                {turnoEspecialList.map((turnoEspecial) => (
                  <tr
                    key={turnoEspecial.Id_TurnoEspecial}
                    className="odd:bg-white even:bg-gray-100"
                  >
                    {/* <td className="py-2 px-4 border-b">
                      {turnoEspecial.Id_Aprendiz}
                    </td> */}
                    <td className="py-2 px-4 border-b">
                      {turnoEspecial.Id_Ficha}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {turnoEspecial.Fec_TurnoEspecial}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {turnoEspecial.Hor_Inicio}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {turnoEspecial.Hor_Fin}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {turnoEspecial.Id_Funcionario}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {turnoEspecial.funcionario.Nom_Funcionario}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {turnoEspecial.unidad?.Nom_Unidad}
                    </td>
                    {/* <td className="py-2 px-4 border-b">
                      {turnoRutinario.Obs_TurnoRutinario}
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ConsultarTurnoEspecial;
