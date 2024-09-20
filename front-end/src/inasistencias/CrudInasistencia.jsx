import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";

import Alerta from "../components/Alerta.jsx";
import WriteTable from "../Tables/Data-Tables.jsx";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const URI = "inasistencias";

const CrudFuncionarios = () => {
  const [inasistenciaList, setInasistenciaList] = useState([]);
  // const [setButtonForm] = useState("Enviar");
  const [crearDataTable, setCrearDataTable] = useState(false);

  const [alerta, setAlerta] = useState({});

  const titleModul = ["REPORTE DE INASISTENCIAS"];
  const tableName = "Inasistencias";

  const titles = [
    "Identificador",
    "Fecha Turno",
    "Motivo Inasistencia",
    "Documento Aprendiz ",
    "Acciones",
  ];

  const ButtonsForOtherModules = () => [
    <button
      className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
      key="get"
    >
      <FaRegEdit />
    </button>,
    <button
      className="text-red-500 hover:text-red-700 hover:border hover:border-red-500 p-1 rounded"
      key="delete"
    >
      <MdDeleteOutline />
    </button>,
  ];

  const formattedData = inasistenciaList.map((inasistencia) => {
    const rowData = [
      inasistencia.Id_Inasistencia,
      inasistencia.Fec_Inasistencia,
      inasistencia.Mot_Inasistencia,
      inasistencia.turnorutinario.Id_Aprendiz || "N/A",
    ]
    rowData.push(ButtonsForOtherModules(inasistencia.Id_Inasistencia));
    return rowData;
  });

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
      <h1 className="text-zinc-950 font-extrabold text-4xl md:text-4xl text-center mb-7">
        Gestionar Informacion de las
        <span className="text-botones"> Inasistencias</span>
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
            tableName={tableName}
            buttons={ButtonsForOtherModules}
          />
        )}
      </div>
    </>
  );
};

export default CrudFuncionarios;
