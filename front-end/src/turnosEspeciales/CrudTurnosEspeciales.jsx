import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";

import FormTurnosEspeciales from "./FormTurnosEspeciales.jsx";
import DataTableTurnosEspeciales from "./dataTableTurnosEspeciales.jsx";
import Alerta from "../components/Alerta.jsx";
import WriteTable from "../Tables/Data-Tables.jsx";

import { IoMdPersonAdd } from "react-icons/io";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { Outlet } from "react-router-dom";

import { exportToExcel } from './ExportExcel.js';

const URI = "/turnoespecial";
const URI_FOTOS = '/public/uploads/'
const URI_AXIOS = import.meta.env.VITE_BACKEND_URL;

const CrudTurnosEspeciales = () => {
  const [turnoEspecialList, setTurnoEspecialList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddturnoEspecial, setStateAddturnoEspecial] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);

  const [turnoEspecial, setTurnoEspecial] = useState({
    // Id_TurnoEspecial: "",
    Fec_TurnoEspecial: "",
    Hor_Inicio: "",
    Hor_Fin: "",
    Obs_TurnoEspecial: "",
    Tot_AprendicesAsistieron: "",
    Id_Ficha: "",
    Img_Asistencia: "",
    Id_Funcionario: "",
    Id_Unidad: "",
  });
  const shouldShowPhoto = turnoEspecialList.some(row => row.Img_Asistencia !== undefined);
  const titles = [
    // "ID",
    "Fecha Turno",
    "Hora Inicio",
    "Hora Fin",
    "Observaciones",
    "Total Aprendices",
    "Ficha",
    // "Imagen Asistencia",
    "Funcionario",
    "Unidad",
    shouldShowPhoto && "Foto Asistencia",
    "Acciones"
  ].filter(Boolean)

  const formattedData = turnoEspecialList.map((turnoEspecial) => {
    const rowData = [
      // turnoEspecial.Id_TurnoEspecial,
      turnoEspecial.Fec_TurnoEspecial,
      turnoEspecial.Hor_Inicio,
      turnoEspecial.Hor_Fin,
      turnoEspecial.Obs_TurnoEspecial,
      turnoEspecial.Tot_AprendicesAsistieron,
      turnoEspecial.Id_Ficha,
      // turnoEspecial.Img_Asistencia,
      turnoEspecial.Id_Funcionario,
      turnoEspecial.Id_Unidad,
    ];
    if (shouldShowPhoto) {
      rowData.push(
        <img
          width="80px"
          src={`${URI_AXIOS}${URI_FOTOS}${turnoEspecial.Img_Asistencia}`}
          alt="No Foto"
        />
      );
    }
    return rowData;
  })

  useEffect(() => {
    getAllTurnosEspeciales();
  }, []);

  const getAllTurnosEspeciales = async () => {
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
        setTurnoEspecialList(respuestApi.data);
        setCrearDataTable(true);
      } else {
        setAlerta({
          msg: `Error al cargar los registros!`,
          error: true,
        });
      }

      
    } catch (error) {
      setAlerta({
        msg: `Ocurrio un error!`,
        error: true,
      });
      console.error(error);
    }
  };
  const getTurnoEspecial = async (Id_TurnoEspecial) => {
    setButtonForm("Actualizar");
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios(
        `${URI}/${Id_TurnoEspecial}`,
        config
      );
      if (respuestApi.status === 200) {
        setTurnoEspecial({
          ...respuestApi.data,
        });
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

  const deleteTurnoEspecial = (Id_TurnoEspecial) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Borrar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = ReactSession.get("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const respuestApi = await clienteAxios.delete(
            `${URI}/${Id_TurnoEspecial}`,
            config
          );
          if (respuestApi.status === 200) {
            getAllTurnosEspeciales(); // Refrescar la lista después de borrar
            Swal.fire({
              title: "Borrado!",
              text: "El registro ha sido borrado.",
              icon: "success",
            });
          } else {
            alert(respuestApi.data.message);
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Hubo un problema al intentar borrar el registro.",
            icon: "error",
          });
          console.error(error);
        }
      }
    });
  };

  const updateTextButton = (text) => {
    setButtonForm(text);
  };

  const { msg } = alerta;

  // Función para manejar la exportación a Excel
  const handleExportToExcel = () => {
    exportToExcel([], turnoEspecialList); // Pasar [] si `turnoEspecial` está vacío
  };

  return (
    <>
      <h1 className="text-black font-extrabold text-4xl md:text-4xl text-center mb-7">
      Gestionar Informacion de los Turnos Especiales
      </h1>
      <div className="flex justify-end pb-3">
        <button
          className="bg-green-600 px-6 py-2 rounded-xl text-white font-bold m-4 flex items-center hover:bg-green-800"
          onClick={() => {
            setStateAddturnoEspecial(!stateAddturnoEspecial);
          }}
        >
          {stateAddturnoEspecial ? (
            <AiOutlineMinusCircle size={16} className="me-2" />
          ) : (
            <IoMdPersonAdd size={16} className="me-2" />
          )}
          {stateAddturnoEspecial ? "Ocultar" : "Agregar"}
        </button>

        <button
          onClick={handleExportToExcel}
          className="bg-green-600 px-6 py-2 rounded-xl text-white font-bold m-4 flex items-center hover:bg-green-800"
        >
          Exportar a Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <hr />
        {msg && <Alerta alerta={alerta} />}
        <hr />


        {crearDataTable && (
          <WriteTable
            titles={titles}
            data={formattedData}
            deleteRow={deleteTurnoEspecial}
            getRow={getTurnoEspecial}
            setStateAddNewRow={setStateAddturnoEspecial}
          />
        )}
      </div>
      <hr />
      {stateAddturnoEspecial ? (
        <FormTurnosEspeciales
          buttonForm={buttonForm}
          turnoEspecial={turnoEspecial}
          updateTextButton={updateTextButton}
          setTurnoEspecial={setTurnoEspecial}
        />
      ) : null}
      <hr />
      
    </>
  );
};

export default CrudTurnosEspeciales;