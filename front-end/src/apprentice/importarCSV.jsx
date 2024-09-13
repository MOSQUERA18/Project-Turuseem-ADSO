import { useState } from 'react';
import { ReactSession } from "react-client-session";
import clienteAxios from '../config/axios.jsx';
const URI = import.meta.env.VITE_BACKEND_URL + "/aprendiz/";
import Alerta from "../components/Alerta.jsx";
import { FaFileCsv } from "react-icons/fa6";


const ImportarCSV = () => {
  const [file, setFile] = useState(null);
  const [alerta, setAlerta] = useState({});

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setAlerta({
        msg: 'Por favor selecciona un archivo CSV.',
        error: true,
      });

      // Limpiar la alerta después de 4 segundos
      setTimeout(() => {
        setAlerta({});
      }, 4000);

      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = ReactSession.get("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await clienteAxios.post(`${URI}import-csv`, formData, config);

      if (response.status === 200) {
        setAlerta({
          msg: 'Archivo CSV subido y procesado correctamente.',
          error: false,
        });
      } else {
        setAlerta({
          msg: 'Hubo un error al procesar el archivo.',
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: 'Hubo un error al procesar el archivo. Existen documentos repetidos.',
        error: true,
      });
    } finally {
      // Limpiar el archivo y el estado después de la carga o error
      setFile(null);
      document.querySelector('input[type="file"]').value = '';

      // Ocultar la alerta después de 4 segundos
      setTimeout(() => {
        setAlerta({});
      }, 4000);
    }
  };

  const { msg } = alerta;

  return (
<div className="">
  {msg && <Alerta alerta={alerta} />}
  <div className="flex items-center space-x-4"> {/* Flex container con espacio entre los botones */}
    {/* Input oculto para subir archivos */}
    <input
      id="fileInput"
      type="file"
      accept=".csv"
      onChange={handleFileChange}
      className="hidden"  // Ocultamos el input de archivo
    />

    {/* Label que contiene el ícono y actúa como el disparador del input */}
    <label
      htmlFor="fileInput"
      className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-800 cursor-pointer"
    >
      <FaFileCsv className="mr-0" />  {/* Ícono de CSV */}
      
    </label>

    {/* Botón para traer datos a la tabla */}
    <button
      onClick={handleUpload}
      className="bg-botones text-white px-4 py-2 rounded hover:bg-blue-800 font-semibold"
    >
      Traer Datos a Tabla
    </button>
  </div>

  {/* Muestra el nombre del archivo seleccionado */}
  {file && (
    <p className="mt-2 text-gray-700">Archivo seleccionado: {file.name}</p>
  )}
</div>

  );
};

export default ImportarCSV;
