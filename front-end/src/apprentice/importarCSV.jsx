import { useState } from 'react';
import { ReactSession } from "react-client-session";
import clienteAxios from '../config/axios.jsx';
const URI = import.meta.env.VITE_BACKEND_URL + "/aprendiz/";
import Alerta from "../components/Alerta.jsx";

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
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-blue-800 font-semibold"
      >
        Subir CSV
      </button>
    </div>
  );
};

export default ImportarCSV;
