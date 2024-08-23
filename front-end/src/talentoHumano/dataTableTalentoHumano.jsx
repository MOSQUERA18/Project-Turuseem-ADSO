/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-responsive";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";

import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const DataTableTalentoHumano = ({
  talentoHumanoList,
  getTalentoHumano,
  deleteTalentoHumano,
  setStateAddTalentoHumano
}) => {
  const tableRef = useRef(null);
  const tableInstance = useRef(null);

  useEffect(() => {
    if (talentoHumanoList.length > 0) {
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
        tableInstance.current.clear().rows.add(talentoHumanoList).draw();
      }
    }

    return () => {
      if (tableInstance.current) {
        tableInstance.current.destroy();
        tableInstance.current = null;
      }
    };
  }, [talentoHumanoList]);

  return (
    <div>
      <table
        ref={tableRef}
        id="tablaTalentoHumano"
        className="display responsive nowrap text-center"
      >
        <thead className="text-white bg-green-700">
          <tr>
            <th className="py-2 px-4 border-2 border-b-gray-500">Documento</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Nombre</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Apellido</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Género</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Correo</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Teléfono</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Ficha</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Estado</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {talentoHumanoList.map((talentoHumano) => (
            <tr key={talentoHumano.Id_Talento_Humano}>
              <td className="py-2 px-4 border-b">{talentoHumano.Id_Talento_Humano}</td>
              <td className="py-2 px-4 border-b">{talentoHumano.Nom_Talento_Humano}</td>
              <td className="py-2 px-4 border-b">{talentoHumano.Ape_Talento_Humano}</td>
              <td className="py-2 px-4 border-b">{talentoHumano.Genero_Talento_Humano}</td>
              <td className="py-2 px-4 border-b">{talentoHumano.Cor_Talento_Humano}</td>
              <td className="py-2 px-4 border-b">{talentoHumano.Tel_Talento_Humano}</td>
              <td className="py-2 px-4 border-b">{talentoHumano.fichas ? talentoHumano.fichas.Id_Ficha : "N/A"}</td>
              <td className="py-2 px-4 border-b">{talentoHumano.Estado}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => [
                    getTalentoHumano(talentoHumano.Id_Talento_Humano),
                    setStateAddTalentoHumano(true),
                  ]}
                  className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                >
                  <FaRegEdit />
                </button>
                <button
                  onClick={() =>
                    deleteTalentoHumano(talentoHumano.Id_Talento_Humano)
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

export default DataTableTalentoHumano;
