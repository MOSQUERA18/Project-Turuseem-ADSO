/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { ReactSession } from "react-client-session";
import $ from "jquery";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import { BsFiletypeXlsx } from "react-icons/bs";
import { BsFiletypeSql } from "react-icons/bs";
import clienteAxios from "../config/axios";
import { MdOutlineDownloading } from "react-icons/md";

//pidan de parametros los titulos y la data
function WriteTable({
  titles,
  data,
  deleteRow,
  getRow,
  setStateAddNewRow,
  toggleModal,
  titleModul,
  tableName
}) {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const exportPDF = async () => {
    try {
      const tableElement = tableRef.current;

      if (!tableElement) {
        console.error("No se pudo encontrar el elemento de la tabla.");
        return;
      }

      // Obtener el contenido de thead y tbody por separado
      const theadHtml = tableElement.querySelector("thead")?.outerHTML || "";
      const tbodyHtml = tableElement.querySelector("tbody")?.outerHTML || "";

      // Validar si thead o tbody son nulos o indefinidos
      if (!theadHtml || !tbodyHtml) {
        console.error("No se pudo obtener el contenido de la tabla.");
        return;
      }

      // Combinar thead y tbody para enviar la tabla completa
      const tableHtml = `<table>${theadHtml}${tbodyHtml}</table>`;

      const token = ReactSession.get("token");

      // Validar si el token es válido
      if (!token) {
        console.error("Token no disponible.");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Hacer la petición al backend con el HTML de la tabla completa
      const response = await clienteAxios.post(
        "/reportPDF",
        { innerHTML: tableHtml, titleModul: titleModul },
        config
      );

      // Asegúrate de que estás accediendo a los datos correctamente
      if (response.data.Reporte) {
        const link = document.createElement("a");
        link.href = `data:application/pdf;base64,${response.data.Reporte}`;
        link.download = `${titleModul}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("No se encontró el reporte");
      }
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al enviar el HTML:", error);
    }
  };

  const exportToExcel = async () => {
    try {
      const headers = [];
      document
        .querySelectorAll("table thead th")
        .forEach((header, index, array) => {
          if (index < array.length - 1) {
            // Ignora la última columna
            headers.push(header.innerText);
          }
        });

      const data = [];
      document.querySelectorAll("table tbody tr").forEach((row) => {
        const rowData = [];
        row.querySelectorAll("td").forEach((cell, index, array) => {
          if (index < array.length - 1) {
            rowData.push(cell.innerText);
          }
        });
        data.push(rowData);
      });

      const tableData = {
        headers: headers,
        rows: data,
      };
      const token = ReactSession.get("token");

      // Validar si el token es válido
      if (!token) {
        console.error("Token no disponible.");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await clienteAxios.post(
        "/reportXLSX",
        tableData,
        config
      );

      const base64XLSX = response.data.base64;
      const link = document.createElement("a");
      link.href =
        "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
        base64XLSX;
      link.download = `${titleModul}.xlsx`;
      link.click();
    } catch (error) {
      console.error("Error exporting to Excel", error);
    }
  };

  const exportSQL = () => {
    const table = document.getElementById("TableDinamic");
    const rows = table.querySelectorAll("tbody tr");

    // Capturar los nombres de las columnas (los headers de la tabla)
    const headers = Array.from(table.querySelectorAll("thead th")).map(
      (th) => th.innerText
    );

    const data = Array.from(rows).map((row) => {
      const cells = row.querySelectorAll("td");
      let rowData = {};
      cells.forEach((cell, index) => {
        rowData[headers[index]] = cell.innerText;
      });
      return rowData;
    });

    return data;
  };

  const handleEsportSQL = async () => {
    setLoading(true);

    const tableData = exportSQL();

    const dataValues = tableData.map((row) => Object.values(row))
    const payload = {
      tableName: tableName,
      data: dataValues,
    };
    const token = ReactSession.get("token");

    // Validar si el token es válido
    if (!token) {
      console.error("Token no disponible.");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await clienteAxios.post("/exportsSQL", payload, config);

      const { base64SQL } = response.data;

      const link = document.createElement("a");
      link.href = `data:application/sql;base64,${base64SQL}`;
      link.download = `${tableName}.sql`;
      link.click();

      console.log("Archivo SQL descargado correctamente");
    } catch (error) {
      console.error("Error al exportar el archivo SQL:", error);
    } finally {
      setLoading(false);
    }
  };

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
          info: "Mostrando página _PAGE_ de _PAGES_ paginas",
          infoEmpty: "No hay registros disponibles",
          infoFiltered: "(Filtrado de _MAX_ registros totales)",
        },
        drawCallback: () => {
          $("#TableDinamic td, #TableDinamic th").css({
            "text-align": "center",
            "vertical-align": "middle",
          });
        },
      });
    }
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto container ">
        <div className="flex justify-end px-5">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mx-1 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
            onClick={exportPDF}
            title="Export PDF"
          >
            <FaRegFilePdf size={17} />
          </button>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mx-1 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
            onClick={exportToExcel}
            title="Export XLSX"
          >
            <BsFiletypeXlsx size={17} />
          </button>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mx-1 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
            onClick={handleEsportSQL}
            title="Export SQL"
          >
            {loading ? <MdOutlineDownloading size={17} /> :<BsFiletypeSql size={17} />}
          </button>
        </div>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="overflow-hidden">
              <table
                className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table table-responsive"
                id="TableDinamic"
                ref={tableRef}
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
                            toggleModal(),
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
          </div>
        </div>
      </div>
    </>
  );
}

export default WriteTable;
