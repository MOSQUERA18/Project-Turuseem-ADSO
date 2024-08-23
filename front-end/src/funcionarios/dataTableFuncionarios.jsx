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
          responsive: true,
          language: {
            // paginate: {
            //   first: "<<",
            //   previous: "<",
            //   next: ">",
            //   last: ">>"
            // },
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
        tableInstance.current.clear().rows.add(funcionarioList).draw();
      }
    }

    return () => {
      if (tableInstance.current) {
        tableInstance.current.destroy();
        tableInstance.current = null;
      }
    };
  }, [funcionarioList]);

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
                    getFuncionario(funcionario.Id_funcionario),
                    setStateAddFuncionario(true),
                  ]}
                  className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                >
                  <FaRegEdit />
                </button>
                <button
                  onClick={() => deleteFuncionario(funcionario.Id_funcionario)}
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
