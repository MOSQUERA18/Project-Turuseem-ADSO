import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
// import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";

// import { exportToExcel } from './ExportExcel.js';

import Alerta from "../components/Alerta.jsx";
import WriteTable from "../Tables/Data-Tables.jsx";

const URI = "inasistencias";

const CrudFuncionarios = () => {
  const [inasistenciaList, setInasistenciaList] = useState([]);
  // const [setButtonForm] = useState("Enviar");
  const [crearDataTable, setCrearDataTable] = useState(false);

  const [alerta, setAlerta] = useState({});

  const titleModul = ["REPORTE DE INASISTENCIAS"];

  const titles = [
    "Identificador",
    "Fecha Turno",
    "Motivo Inasistencia",
    "Documento Aprendiz ",
    "Acciones",
  ];
  const formattedData = inasistenciaList.map((inasistencia) => [
    inasistencia.Id_Inasistencia,
    inasistencia.Fec_Inasistencia,
    inasistencia.Mot_Inasistencia,
    inasistencia.turnorutinario.Id_Aprendiz,
  ]);

  useEffect(() => {
    getAllInasistencias();
  }, []);

  const getAllInasistencias = async () => {
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios(URI, config);
      if (respuestApi.status === 200) {
        setInasistenciaList(respuestApi.data);
        setCrearDataTable(true);
      } else {
        setAlerta({
          msg: `Error al cargar los registros!`,
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: `Error al cargar los registros!`,
        error: true,
      });
      console.error(error);
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-black font-extrabold text-4xl md:text-4xl text-center mb-7">
        Gestionar Informacion de las
        <span className="text-blue-700"> Inasistencias</span>
      </h1>
      <br />
      <br />
      <div className="overflow-x-auto">
        <hr />
        {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
        {crearDataTable && (
          <WriteTable 
          titles={titles}
          data={formattedData}
          titleModul={titleModul}
          />
        )}
      </div>
    </>
  );
};

export default CrudFuncionarios;
