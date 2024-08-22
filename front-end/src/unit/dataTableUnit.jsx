/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-responsive";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";

import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const DataTableUnit = ({
  unidadList,
  getUnidad,
  deleteUnidad,
  setStateAddUnidad,
}) => {
  const tableRef = useRef(null);
  const tableInstance = useRef(null);

  useEffect(() => {
    if (unidadList.length > 0) {
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
            infoFiltered: "(filtrado de _MAX_ registros totales)"
          }
        });
      } else {
        tableInstance.current.clear().rows.add(unidadList).draw();
      }
    }

    return () => {
      if (tableInstance.current) {
        tableInstance.current.destroy();
        tableInstance.current = null;
      }
    };
  }, [unidadList]);

  return (
    <div>
      <table
        ref={tableRef}
        id="tablaUnidad"
        className="display responsive nowrap"
      >
        <thead className="text-white bg-green-700">
          <tr>
            <th className="py-2 px-4 border-2 border-b-gray-500">ID</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Nombre</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Hora Apertura</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Hora Cierre</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Estado</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Área</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {unidadList.map((unidad) => (
            <tr key={unidad.Id_Unidad}>
              <td className="py-2 px-4 border-b">{unidad.Id_Unidad}</td>
              <td className="py-2 px-4 border-b">{unidad.Nom_Unidad}</td>
              <td className="py-2 px-4 border-b">{unidad.Hor_Apertura}</td>
              <td className="py-2 px-4 border-b">{unidad.Hor_Cierre}</td>
              <td className="py-2 px-4 border-b">{unidad.Estado}</td>
              <td className="py-2 px-4 border-b">{unidad.areas?.Nom_Area}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => [
                    getUnidad(unidad.Id_Unidad),
                    setStateAddUnidad(true),
                  ]}
                  className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                >
                  <FaRegEdit />
                </button>
                <button
                  onClick={() => deleteUnidad(unidad.Id_Unidad)}
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

export default DataTableUnit;
