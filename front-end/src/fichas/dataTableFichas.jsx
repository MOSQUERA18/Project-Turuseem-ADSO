/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-responsive";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";

import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const DataTableFichas = ({
  fichasList,
  getFicha,
  deleteFichas,
  setStateAddFichas,
}) => {
  const tableRef = useRef(null);
  const tableInstance = useRef(null);

  useEffect(() => {
    if (fichasList.length > 0) {
      const tableElement = $(tableRef.current);

      if (!tableInstance.current) {
        tableInstance.current = tableElement.DataTable({
          responsive: true,
          language: {
            search: "Buscar:", // Cambia el texto de búsqueda aquí
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
        tableInstance.current.clear().rows.add(fichasList).draw();
      }
    }

    return () => {
      if (tableInstance.current) {
        tableInstance.current.destroy();
        tableInstance.current = null;
      }
    };
  }, [fichasList]);

  return (
    <div>
      <table
        ref={tableRef}
        id="tablaFichas"
        className="display responsive nowrap text-center"
      >
        <thead className="text-white bg-green-700 text-center">
          <tr>
            <th className="py-2 px-4 border-2 border-b-gray-500 w-auto">
              Numero <br />
              de Ficha
            </th>
            <th className="py-2 px-4 border-2 border-b-gray-500 text-center">
              Fecha Inicio <br /> Etapa Lectiva
            </th>
            <th className="py-2 px-4 border-2 border-b-gray-500">
              Fecha Fin <br /> Etapa Lectiva
            </th>
            <th className="py-2 px-4 border-2 border-b-gray-500">
              Cantidad <br /> Aprendices
            </th>
            <th className="py-2 px-4 border-2 border-b-gray-500">
              Nombre <br /> Programa
            </th>
            <th className="py-2 px-4 border-2 border-b-gray-500">
              Estado Ficha
            </th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {fichasList.map((ficha) => (
            <tr key={ficha.Id_Ficha}>
              <td className="py-2 px-4 border-b">{ficha.Id_Ficha}</td>
              <td className="py-2 px-4 border-b">
                {ficha.Fec_InicioEtapaLectiva}
              </td>
              <td className="py-2 px-4 border-b">
                {ficha.Fec_FinEtapaLectiva}
              </td>
              <td className="py-2 px-4 border-b">{ficha.Can_Aprendices}</td>
              <td className="py-2 px-4 border-b">
                {ficha.programasFormacion?.Nom_ProgramaFormacion}
              </td>
              <td className="py-2 px-4 border-b">
                {ficha.Estado === "Inactivo" ? "Inactiva" : "Activa"}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => [
                    getFicha(ficha.Id_Ficha),
                    setStateAddFichas(true),
                  ]}
                  className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                >
                  <FaRegEdit />
                </button>
                <button
                  onClick={() => deleteFichas(ficha.Id_Ficha)}
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

export default DataTableFichas;
