/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-responsive";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";

import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
// import clienteAxios from "../config/axios";

const DataTableTurnosEspeciales = ({
  turnoEspecialList,
  getTurnoEspecial,
  deleteTurnoEspecial,
  setStateAddturnoEspecial,
  URI_FOTOS
}) => {
  const tableRef = useRef(null);
  const tableInstance = useRef(null);
  const URI_AXIOS = import.meta.env.VITE_BACKEND_URL
  useEffect(() => {
    if (turnoEspecialList.length > 0) {
      const tableElement = $(tableRef.current);

      if (!tableInstance.current) {
        tableInstance.current = tableElement.DataTable({
          responsive: true,
          language: {
            search: "Buscar:",
            lengthMenu: "Mostrar _MENU_ registros por página",
            zeroRecords: "No se encontraron resultados",
            info: "Mostrando página _PAGE_ de _PAGES_",
            infoEmpty: "No hay registros disponibles",
            infoFiltered: "(filtrado de _MAX_ registros totales)",
          },
          drawCallback: () => {
            $("select").addClass("w-16");
          },
        });
      } else {
        tableInstance.current.clear().rows.add(turnoEspecialList).draw();
      }
    }

    return () => {
      if (tableInstance.current) {
        tableInstance.current.destroy();
        tableInstance.current = null;
      }
    };
  }, [turnoEspecialList]);

  return (
    <div>
      <table
        ref={tableRef}
        id="tablaturnoEspecial"
        className="display responsive nowrap text-center"
      >
        <thead className="text-white bg-green-700">
          <tr className="">
            {/* <th className="py-2 px-4 border-2 border-b-gray-500">ID</th> */}
            <th className="py-2 px-4 border-2 border-b-gray-500">
              Fecha Turno
            </th>
            <th className="py-2 px-4 border-2 border-b-gray-500">
              Hora Inicio
            </th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Hora Fin</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">
              Observaciones
            </th>
            <th className="py-2 px-4 border-2 border-b-gray-500">
              Total Aprendices
            </th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Ficha</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">
              Imagen Asistencia
            </th>
            <th className="py-2 px-4 border-2 border-b-gray-500">
              Funcionario
            </th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Unidad</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {turnoEspecialList.map((turnoEspecial) => (
            <tr key={turnoEspecial.Id_TurnoEspecial}>
              <td className="py-2 px-4 border-b">
                {turnoEspecial.Fec_TurnoEspecial}
              </td>
              <td className="py-2 px-4 border-b">{turnoEspecial.Hor_Inicio}</td>
              <td className="py-2 px-4 border-b">{turnoEspecial.Hor_Fin}</td>
              <td className="py-2 px-4 border-b">{turnoEspecial.Obs_TurnoEspecial}</td>
              <td className="py-2 px-4 border-b">{turnoEspecial.Tot_AprendicesAsistieron}</td>
              <td className="py-2 px-4 border-b">
                {turnoEspecial.Id_Ficha}
              </td>
              <td className="py-2 px-4 border-b">
                <img width='80px' src={URI_AXIOS + URI_FOTOS+turnoEspecial.Img_Asistencia} alt="No Foto"></img>
                {/* {turnoEspecial.Img_Asistencia} */}
              </td>
              <td className="py-2 px-4 border-b">
                {turnoEspecial.funcionario?.Nom_Funcionario}
              </td>
              <td className="py-2 px-4 border-b">
                {turnoEspecial.unidad?.Nom_Unidad}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => [
                    getTurnoEspecial(turnoEspecial.Id_TurnoEspecial),
                    setStateAddturnoEspecial(true),
                  ]}
                  className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                >
                  <FaRegEdit />
                </button>
                <button
                  onClick={() =>
                    deleteTurnoEspecial(turnoEspecial.Id_TurnoEspecial)
                  }
                  className="text-red-500 hover:text-red-700 hover:border hover:border-red-500 p-1 rounded"
                >
                  <MdDeleteOutline />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTableTurnosEspeciales;
