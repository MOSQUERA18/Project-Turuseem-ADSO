/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import $ from "jquery";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

//pidan de parametros los titulos y la data
function WriteTable({ titles, data, deleteRow, getRow, setStateAddNewRow }) {
  //table
  useEffect(() => {
    // Verifica si el DataTable ya está inicializado
    if (!$.fn.DataTable.isDataTable("#TableDinamic")) {
      let table = new DataTable("#TableDinamic", {
        responsive: true,
        lengthChange: false,
        pageLength: 10,
        language: {
          search: "Buscar:",
          zeroRecords: "No se encontraron resultados",
          info: "Mostrando página _PAGE_ de _PAGES_",
          infoEmpty: "No hay registros disponibles",
          infoFiltered: "(Filtrado de _MAX_ registros totales)",
        },
      });
    }
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto container">
        <table
          className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table table-responsive"
          id="TableDinamic"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {titles.map((title, index) => (
                <th scope="col" key={index}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => [
                      getRow(row[0]),
                      setStateAddNewRow(true),
                      console.log(row[0]),
                    ]}
                    className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => deleteRow(row[0])}
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
    </>
  );
}

export default WriteTable;
