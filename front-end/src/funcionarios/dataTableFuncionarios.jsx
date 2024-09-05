/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-responsive";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";

import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const DataTableFuncionarios = ({
  funcionarioList,
  getFuncionario,
  deleteFuncionario,
  setStateAddFuncionario,
}) => {
  const tableRef = useRef(null);
  const tableInstance = useRef(null);

  useEffect(() => {
    if (funcionarioList.length > 0) {
      const tableElement = $(tableRef.current);

      if (!tableInstance.current) {
        tableInstance.current = tableElement.DataTable({
          responsive: {
            details: {
              display: $.fn.dataTable.Responsive.display.childRowImmediate,
              type: 'none',
              target: ''
            }
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
            infoFiltered: "(filtrado de _MAX_ registros totales)",
          },
          drawCallback: () => {
            $("select").addClass("w-16");
          },
        });

        // Evento para manejar la visualización responsiva
        tableElement.on('responsive-display', function (e, datatable, row, showHide) {
          if (showHide) {
            const rowData = row.data();
            const $rowEl = $(row.node());
            const $responsiveWrapper = $rowEl.next('.child');

            if ($responsiveWrapper.find('.action-buttons').length === 0) {
              $responsiveWrapper.append(`
                <div class="action-buttons">
                  <button class="update-btn text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M7 17.013l4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"></path><path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"></path></svg>
                  </button>
                  <button class="delete-btn text-red-500 hover:text-red-700 hover:border hover:border-red-500 p-1 rounded">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                  </button>
                </div>
              `);

              $responsiveWrapper.find('.update-btn').on('click', () => {
                getFuncionario(rowData.Id_Funcionario);
                setStateAddFuncionario(true);
              });

              $responsiveWrapper.find('.delete-btn').on('click', () => {
                deleteFuncionario(rowData.Id_Funcionario);
              });
            }
          }
        });
      } else {
        tableInstance.current.clear().rows.add(funcionarioList).draw();
      }
    }

    return () => {
      if (tableInstance.current) {
        tableInstance.current.destroy();
        tableInstance.current = null;
      }
    };
  }, );

  return (
    <div>
      <table
        ref={tableRef}
        id="tablaFuncionarios"
        className="display responsive nowrap text-center"
      >
        <thead className="text-white bg-green-700">
          <tr>
            <th className="py-2 px-4 border-2 border-b-gray-500">Documento</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Nombre</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Apellido</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Género</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Teléfono</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Estado</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Cargo</th>
            <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {funcionarioList.map((funcionario) => (
            <tr key={funcionario.Id_Funcionario}>
              <td className="py-2 px-4 border-b">
                {funcionario.Id_Funcionario}
              </td>
              <td className="py-2 px-4 border-b">
                {funcionario.Nom_Funcionario}
              </td>
              <td className="py-2 px-4 border-b">
                {funcionario.Ape_Funcionario}
              </td>
              <td className="py-2 px-4 border-b">{funcionario.Genero}</td>
              <td className="py-2 px-4 border-b">
                {funcionario.Tel_Funcionario}
              </td>
              <td className="py-2 px-4 border-b">{funcionario.Estado}</td>
              <td className="py-2 px-4 border-b">{funcionario.Cargo}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => [
                    getFuncionario(funcionario.Id_Funcionario),
                    setStateAddFuncionario(true),
                  ]}
                  className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                >
                  <FaRegEdit />
                </button>
                <button
                  onClick={() => deleteFuncionario(funcionario.Id_Funcionario)}
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

export default DataTableFuncionarios;
