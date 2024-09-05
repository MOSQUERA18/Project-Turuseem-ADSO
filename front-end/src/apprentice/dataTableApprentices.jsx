/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-responsive";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";

import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";



const DataTableApprentices = ({
  apprenticeList,
  getApprentice,
  deleteApprentice,
  setStateAddApprentice,
  URIFOTOS
}) => {
  const tableRef = useRef(null);
  const tableInstance = useRef(null);
  const URI_AXIOS = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (apprenticeList.length > 0) {
      const tableElement = $(tableRef.current);

      if (!tableInstance.current) {
        tableInstance.current = tableElement.DataTable({
          responsive: {
            details: {
              display: $.fn.dataTable.Responsive.display.childRowImmediate,
              type: "none",
              target: "",
            },
          },
          columnDefs: [
            { responsivePriority: 1, targets: 0 }, // Documento
            { responsivePriority: 2, targets: -1 }, // Acciones
            { responsivePriority: 3, targets: 1 }, // Nombre
          ],
          language: {
            search: "Buscar:",
            lengthMenu: "Mostrar _MENU_ registros por página",
            zeroRecords: "No se encontraron resultados",
            info: "Mostrando página _PAGE_ de _PAGES_",
            infoEmpty: "No hay registros disponibles",
            infoFiltegreen: "(filtrado de _MAX_ registros totales)",
          },
          drawCallback: () => {
            $("select").addClass("w-16");
          },
        });

        // Evento para manejar la visualización responsiva
        tableElement.on(
          "responsive-display",
          function (e, datatable, row, showHide) {
            if (showHide) {
              const rowData = row.data();
              const $rowEl = $(row.node());
              const $responsiveWrapper = $rowEl.next(".child");

              if ($responsiveWrapper.find(".action-buttons").length === 0) {
                $responsiveWrapper.append(`
                  <div class="action-buttons">
                    <button class="update-btn text-green-500 hover:text-green-700 hover:border hover:border-green-500 mr-3 p-1 rounded">
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M7 17.013l4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"></path><path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"></path></svg>
                    </button>
                    <button class="delete-btn text-green-500 hover:text-green-700 hover:border hover:border-green-500 p-1 rounded">
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                    </button>
                  </div>
                `);

                $responsiveWrapper.find(".update-btn").on("click", () => {
                  getApprentice(rowData.Id_Aprendiz);
                  setStateAddApprentice(true);
                });

                $responsiveWrapper.find(".delete-btn").on("click", () => {
                  deleteApprentice(rowData.Id_Aprendiz);
                });
              }
            }
          }
        );
      } else {
        tableInstance.current.clear().rows.add(apprenticeList).draw();
      }
    }

    return () => {
      if (tableInstance.current) {
        tableInstance.current.destroy();
        tableInstance.current = null;
      }
    };
  }, [apprenticeList]);

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full">
        <div className="overflow-hidden">
      <table
        ref={tableRef}
        id="tablaApprentices"
        className="min-w-full"
      >
        <thead className="text-white bg-green-700">
          <tr>
          <th className="py-2 px-4 border-2 border-b-gray-500">
                Documento
              </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Nombres</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Apellidos</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Ficha</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Fecha de Nacimiento </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Ciudad </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Lugar Residencia </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Edad </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Hijos </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Nombre EPS </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Telefono Padre </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Genero</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Correo</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Telefono Aprendiz</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Total Memorandos</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Total Inasistencias</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Patrocinio</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Estado</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Nombre Empresa</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Centro Convivencia</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Foto Aprendiz</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {apprenticeList.map((apprentice) => (
            <tr key={apprentice.Id_Aprendiz}>
              <td className="py-2 px-4 border-b">{apprentice.Id_Aprendiz}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Nom_Aprendiz}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Ape_Aprendiz}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Id_Ficha}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Fec_Nacimiento}</td>
                        <td className="py-2 px-4 border-b">{apprentice.ciudad.Nom_Ciudad}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Lugar_Residencia}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Edad}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Hijos}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Nom_Eps}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Tel_Padre}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Gen_Aprendiz}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Cor_Aprendiz}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Tel_Aprendiz}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Tot_Memorandos}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Tot_Inasistencias}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Patrocinio}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Estado}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Nom_Empresa}</td>
                        <td className="py-2 px-4 border-b">{apprentice.CentroConvivencia}</td>
                        <td className="py-2 px-4 border-b">
                <img width='80px' src={URI_AXIOS + URIFOTOS + apprentice.Foto_Aprendiz} alt="No Foto" />
                   </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => [
                    getApprentice(apprentice.Id_Aprendiz),
                    setStateAddApprentice(true),
                  ]}
                  className="text-green-500 hover:text-green-700 hover:border hover:border-green-500 mr-3 p-1 rounded"
                >
                  <FaRegEdit />
                </button>
                <button
                  onClick={() => deleteApprentice(apprentice.Id_Aprendiz)}
                  className="text-green-500 hover:text-green-700 hover:border hover:border-green-500 p-1 rounded"
                >
                  <MdDeleteOutline />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
        </div>
    </div>
  );
};

export default DataTableApprentices;