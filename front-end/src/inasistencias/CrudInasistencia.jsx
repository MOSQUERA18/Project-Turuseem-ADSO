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

  // const [setInasistencia] = useState({
  //   Id_Inasistencia: "",
  //   Fec_Inasistencia: "",
  //   Mot_Inasistencia: "",
  //   Id_TurnoRutinario: "",
  // });
  const titleModul = [
    "REPORTE DE INASISTENCIAS"
  ]

  const titles = [
    "Identificador",
    "Fecha Inasistencia",
    "Motivo Inasistencia",
    "Documento Aprendiz",
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
        setCrearDataTable(true)
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

  // const getInasistencia = async (Id_Inasistencia) => {
  //   setButtonForm("Actualizar");
  //   const token = ReactSession.get("token");
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  //   try {
  //     const respuestApi = await clienteAxios.get(
  //       `/${URI}/${Id_Inasistencia}`,
  //       config
  //     );
  //     if (respuestApi.status === 200) {
  //       setInasistencia({
  //         ...respuestApi.data,
  //       });
  //     } else {
  //       setAlerta({
  //         msg: `Error al cargar los registros!`,
  //         error: true,
  //       });
  //     }
  //   } catch (error) {
  //     setAlerta({
  //       msg: `Error al cargar los registros!`,
  //       error: true,
  //     });
  //     console.error(error);
  //   }
  // };

  // const deleteInasistencia = (Id_Inasistencia) => {
  //   Swal.fire({
  //     title: "¿Estas seguro?",
  //     text: "No podrás revertir esto!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Sí, Borrar!",
  //     cancelButtonText: "Cancelar",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       const token = ReactSession.get("token");
  //       const config = {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       };
  //       try {
  //         const respuestApi = await clienteAxios.delete(
  //           `${URI}/${Id_Inasistencia}`,
  //           config
  //         );
  //         console.log(respuestApi);
  //         if (respuestApi.status == 200) {
  //           getAllInasistencias();
  //           Swal.fire({
  //             title: "Borrado!",
  //             text: "El registro ha sido borrado.",
  //             icon: "success",
  //           });
  //         } else {
  //           alert(respuestApi.data.message);
  //         }
  //       } catch (error) {
  //         Swal.fire({
  //           title: "Error!",
  //           text: "Hubo un problema al intentar borrar el registro.",
  //           icon: "error",
  //         });
  //         console.error(error);
  //       }
  //     }
  //   });
  // };

  // const updateTextButton = (text) => {
  //   setButtonForm(text);
  // };

  const { msg } = alerta;

  // const handleExportToExcel = () => {
  //   exportToExcel([], inasistenciaList); // Pasar [] si `programa` está vacío
  // };

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
        <hr />
        {crearDataTable && (
          <WriteTable 
          titles={titles}
          data={formattedData}
          // deleteRow={deleteInasistencia}
          // getRow={getInasistencia}
          titleModul={titleModul}
          />
        )}
      </div>
    </>
  );
};

export default CrudFuncionarios;
