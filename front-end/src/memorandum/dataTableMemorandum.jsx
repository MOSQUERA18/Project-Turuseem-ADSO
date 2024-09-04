/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-responsive";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";

import { MdDeleteForever } from "react-icons/md";
import { BsSendArrowUp } from "react-icons/bs";
// import { MdOutlinePreview } from "react-icons/md";

// import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const DataTableMemorandum = ({
  memorandumList,
  getMemorandum,
  deleteMemorandum,
  setStateAddMemorandum,
  mostrarPdf,
}) => {
  const tableRef = useRef(null);
  const tableInstance = useRef(null);

  useEffect(() => {
    if (memorandumList.length > 0) {
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
        tableInstance.current.clear().rows.add(memorandumList).draw();
      }
    }

    return () => {
      if (tableInstance.current) {
        tableInstance.current.destroy();
        tableInstance.current = null;
      }
    };
  }, [memorandumList]);

  return (
    <div>
      <table
        ref={tableRef}
        id="tablaMemorandos"
        className="display responsive nowrap text-center"
      >
        <thead className="text-white bg-green-700">
          <tr>
            <th className="py-2 px-4 border-2 border-b-gray-500">Documento</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Nombres</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Apellidos</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">
              Fecha Memorando
            </th>
            <th className="py-2 px-4 border-2 border-b-gray-500">
              Motivo Memorando
            </th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {memorandumList.map((memorandum) => (
            <tr
              key={memorandum.Id_OtroMemorando}
              className="odd:bg-white even:bg-gray-100"
            >
              <td className="py-2 px-4 border-b">{memorandum.Id_Aprendiz}</td>
              <td className="py-2 px-4 border-b">
                {memorandum.aprendiz?.Nom_Aprendiz}
              </td>
              <td className="py-2 px-4 border-b">
                {memorandum.aprendiz?.Ape_Aprendiz}
              </td>
              <td className="py-2 px-4 border-b">
                {memorandum.Fec_OtroMemorando}
              </td>
              <td className="py-2 px-4 border-b">
                {memorandum.Mot_OtroMemorando}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => [
                    getMemorandum(memorandum.Id_OtroMemorando),
                    setStateAddMemorandum(true),
                  ]}
                  className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                >
                  <FaRegEdit />
                </button>
                <button
                  onClick={() => deleteMemorandum(memorandum.Id_OtroMemorando)}
                  className="text-red-500 hover:text-red-700 hover:border hover:border-red-500 p-1 rounded "
                >
                  <MdDeleteForever />
                </button>
                <button className="text-indigo-500 hover:text-indigo-700 hover:border hover:border-indigo-500 p-1 rounded">
                  <BsSendArrowUp />
                </button>
                <button
                  className="text-gray-500 hover:text-gray-700 hover:border hover:border-gray-500 p-1 rounded mx-2"
                  onClick={mostrarPdf}
                >
                  {/* <MdOutlinePreview /> */}
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTableMemorandum;
