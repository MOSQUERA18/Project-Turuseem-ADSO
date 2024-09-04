/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import $ from "jquery";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";

//pidan de parametros los titulos y la data
function WriteTable({ titles, data }) {
  //table
  useEffect(() => {
    // Verifica si el DataTable ya está inicializado
    if (!$.fn.DataTable.isDataTable("#TableDinamic")) {
      let table = new DataTable("#TableDinamic", {
        responsive: true,
        lengthChange: false,
        pageLength: 10,
        language: {
          search: "",
          searchPlaceholder: "Buscar...", // Añade un placeholder
        },
      });
    }
  }, []);

  return (
    <>
    <div className="container">
      <table className="table table-responsive" id="TableDinamic">
        <thead>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
  );
}

export default WriteTable;
