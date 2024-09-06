/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { ReactSession } from 'react-client-session';

const ImportarCSV = ({ URI }) => {
  const [fileInput, setFileInput] = useState(null);

  const readCsv = async (e) => {
    e.preventDefault();
    if (!fileInput) {
      console.log("Por favor, selecciona un archivo CSV.");
      return;
    }

    const token = ReactSession.get("token");
    const formData = new FormData();
    formData.append("file", fileInput);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuestApi = await axios.post(
        `${URI}import-csv`,
        formData,
        config
      );
      switch (respuestApi.status) {
        case 200:
          console.log("Archivo importado exitosamente.");
          break;
        case 400:
          console.log(
            "Error en la solicitud. Verifica el archivo y los datos."
          );
          break;
        case 401:
          console.log("No autorizado. Inicia sesión nuevamente.");
          break;
        case 404:
          console.log("Recurso no encontrado.");
          break;
        case 500:
          console.log("Error en el servidor. Inténtalo de nuevo más tarde.");
          break;
        default:
          console.log("Respuesta desconocida:", respuestApi.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <form
        id="importCsvForm"
        action=""
        className="bg-white rounded-2xl max-w-3xl w-full"
        onSubmit={readCsv}
      >
        <div className="flex items-end">
          <input
            id="fileInput"
            type="file"
            className="custom-file-input w-full overflow-clip rounded-xl border border-slate-300 bg-slate-100/50 text-sm text-slate-700 file:mr-4 file:cursor-pointer file:border-none file:px-4 file:py-2 file:font-medium file:text-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-75 dark:text-slate-300 file:bg-green-400 dark:file:text-white dark:focus-visible:outline-blue-600 mt-2"
            onChange={(e) => setFileInput(e.target.files[0])}
          />
          <input
            type="submit"
            id="button"
            value="Enviar"
            className="bg-green-600 h-11 flex content-center px-6 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-green-800 md:w-auto ml-5"
          />
        </div>
      </form>
    </div>
  );
};

export default ImportarCSV;
