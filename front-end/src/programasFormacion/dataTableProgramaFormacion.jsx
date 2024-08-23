/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-responsive";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";

import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const DataTableProgramaFormacion = ({
  programaList,
  getPrograma,
  deletePrograma,
  setStateAddPrograma,
}) => {
  const tableRef = useRef(null);
  const tableInstance = useRef(null);

  useEffect(() => {
    if (programaList.length > 0) {
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
        tableInstance.current.clear().rows.add(programaList).draw();
      }
    }

    return () => {
      if (tableInstance.current) {
        tableInstance.current.destroy();
        tableInstance.current = null;
      }
    };
  }, [programaList]);

  return (
    <div>
      <table
        ref={tableRef}
        id="tablaPrograma"
        className="display responsive nowrap text-center"
      >
        <thead className="text-white bg-green-700">
          <tr className="">
            <th className="py-2 px-4 border-2 border-b-gray-500">ID</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Nombre</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">
              Tipo ProgramaFormacion
            </th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Área</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {programaList.map((programa) => (
            <tr key={programa.Id_ProgramaFormacion}>
              <td className="py-2 px-4 border-b">
                {programa.Id_ProgramaFormacion}
              </td>
              <td className="py-2 px-4 border-b">
                {programa.Nom_ProgramaFormacion}
              </td>
              <td className="py-2 px-4 border-b">
                {programa.Tip_ProgramaFormacion}
              </td>
              <td className="py-2 px-4 border-b">{programa.areas?.Nom_Area}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => [
                    getPrograma(programa.Id_ProgramaFormacion),
                    setStateAddPrograma(true),
                  ]}
                  className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                >
                  <FaRegEdit />
                </button>
                <button
                  onClick={() => deletePrograma(programa.Id_ProgramaFormacion)}
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

export default DataTableProgramaFormacion;
