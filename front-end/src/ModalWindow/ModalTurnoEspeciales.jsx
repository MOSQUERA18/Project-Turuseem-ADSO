/* eslint-disable react/prop-types */
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import { ReactSession } from "react-client-session";


const ModalTurnoEspeciales = ({
  isOpenTurnos,
  toggleModalTurnos,
  turnoEspecialAprendiz,
}) => {
  const [alerta, setAlerta] = useState({});
  const [asistencia, setAsistencia] = useState([]);

  // Manejar el evento cuando cambia el estado del toggle
  const handleToggle = (e, Id_TurnoEspecial, Id_Aprendiz) => {
    const checked = e.target.checked;
    const updatedAsistencia = asistencia.map((item) =>
      item.Id_TurnoEspecial === Id_TurnoEspecial &&
      item.Id_Aprendiz === Id_Aprendiz
        ? { ...item, asistio: checked ? "Sí" : "No" }
        : item
    );
    setAsistencia(updatedAsistencia);

    // Si no existe en el array de asistencia, lo agregamos
    if (
      !updatedAsistencia.find(
        (item) =>
          item.Id_TurnoEspecial === Id_TurnoEspecial &&
          item.Id_Aprendiz === Id_Aprendiz
      )
    ) {
      setAsistencia([
        ...updatedAsistencia,
        {
          Id_TurnoEspecial,
          Id_Aprendiz,
          asistio: checked ? "Sí" : "No",
        },
      ]);
    }
  };

  const handleGuardarCambios = async () => {
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      // Enviar cada entrada de asistencia modificada al backend
      for (const item of asistencia) {
        const response = await clienteAxios.put(
          `/turEspAprendiz/${item.Id_TurnoEspecial}`,
          {
            asistio: item.asistio,
            Id_Aprendiz: item.Id_Aprendiz
          },
          config
        );
        console.log("Actualizado correctamente:", response.data);
      }

      setAlerta({ msg: "Cambios guardados correctamente", tipo: "exito" });
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      setAlerta({ msg: "Hubo un error al guardar los cambios", tipo: "error" });
    }
  };

  return (
    <>
      {isOpenTurnos && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative p-4 w-full max-w-4xl h-auto min-h-[200px] max-h-[94vh]">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Asistencia a Turnos Especiales
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => toggleModalTurnos()}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>

              {alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}

              <div className="p-4 md:p-5 space-y-2">
                <div className="overflow-auto max-h-[60vh]">
                  <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 border-b border-black">
                    <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-black">
                      <tr>
                        <th className="py-2 px-4">Documento Aprendiz</th>
                        <th className="py-2 px-4">Nombre</th>
                        <th className="py-2 px-4">Apellido</th>
                        <th className="py-2 px-4">Ficha</th>
                        <th className="py-2 px-4">Unidad</th>
                        <th className="py-2 px-4">Funcionario Responsable</th>
                        <th className="py-2 px-4">Fecha Turno Especial</th>
                        <th className="py-2 px-4">Asistencia</th>
                      </tr>
                    </thead>
                    <tbody>
                      {turnoEspecialAprendiz.map((turno, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-black">
                          <td className="py-2 px-4">{turno.Id_Aprendiz}</td>
                          <td className="py-2 px-4">
                            {turno.aprendiz?.Nom_Aprendiz}
                          </td>
                          <td className="py-2 px-4">
                            {turno.aprendiz?.Ape_Aprendiz}
                          </td>
                          <td className="py-2 px-4">
                            {turno.turnoEspecial?.Id_Ficha}
                          </td>
                          <td className="py-2 px-4">
                            {turno.turnoEspecial?.unidad?.Nom_Unidad}
                          </td>
                          <td className="py-2 px-4">
                            {turno.turnoEspecial?.funcionario?.Nom_Funcionario}
                          </td>
                          <td className="py-2 px-4">
                            {turno.turnoEspecial?.Fec_TurnoEspecial}
                          </td>
                          <td className="py-2 px-4">
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={
                                  asistencia.find(
                                    (item) =>
                                      item.Id_TurnoEspecial ===
                                        turno.turnoEspecial?.Id_TurnoEspecial &&
                                      item.Id_Aprendiz === turno.Id_Aprendiz
                                  )?.asistio === "Sí"
                                }
                                onChange={(e) =>
                                  handleToggle(
                                    e,
                                    turno.turnoEspecial?.Id_TurnoEspecial,
                                    turno.Id_Aprendiz
                                  )
                                }
                                className="sr-only peer"
                              />
                              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                              <span className="ml-2 text-sm font-medium">
                                Asistió
                              </span>
                            </label>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={handleGuardarCambios}
                  className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none rounded-lg text-sm px-5 py-2.5"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalTurnoEspeciales;
