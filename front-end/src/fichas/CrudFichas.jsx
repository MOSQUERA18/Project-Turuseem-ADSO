import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";

import { exportToExcel } from './ExportExcel.js'

import FormFichas from "./formFichas.jsx";
import Alerta from "../components/Alerta.jsx";
import DataTableFichas from "./dataTableFichas.jsx";

import { IoMdPersonAdd } from "react-icons/io";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { Outlet } from "react-router-dom";

const URI = "fichas";

const CrudFichas = () => {
  const [fichasList, setFichasList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddFichas, setStateAddFichas] = useState(false);
  const [alerta, setAlerta] = useState({});

  const [fichas, setFichas] = useState({
    Id_Ficha: "",
    Fec_IniEtapaLectiva: "",
    Fec_FinEtapaLectiva: "",
    Can_Aprendices: "",
    Id_ProgramaFormacion: "",
    Estado: "",
  });

  useEffect(() => {
    getAllFichas();
  }, []);

  const getAllFichas = async () => {
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
        setFichasList(respuestApi.data);
      } else {
        setAlerta({
          msg: `Error al cargar los registros!`,
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: `Error al cargar las Ficha!`,
        error: true,
      });
      console.error(error);
    }
  };

  const getFicha = async (Id_Ficha) => {
    setButtonForm("Actualizar");
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios(`${URI}/${Id_Ficha}`, config);
      if (respuestApi.status === 200) {
        setFichas({
          ...respuestApi.data,
        });
      } else {
        setAlerta({
          msg: respuestApi.data.message,
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: error.response.data.message,
        error: true,
      });
      console.log(error);
    }
  };

  const deleteFichas = (Id_Ficha) => {
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
            `/${URI}/${Id_Ficha}`,
            config
          );
          if (respuestApi.status === 200) {
            getAllFichas(); // Refrescar la lista después de borrar
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
    exportToExcel([], fichasList); // Pasar [] si `fichas` está vacío
  };
  return (
    <>
      <h1 className="text-center font-extrabold text-3xl text-green-700 uppercase">
      Gestionar Informacion de las Fichas
      </h1>
      <div className="flex justify-end pb-3">
        <button
          className="bg-green-600 px-6 py-2 rounded-xl text-white font-bold m-4 flex items-center hover:bg-green-800"
          onClick={() => {
            setStateAddFichas(!stateAddFichas);
          }}
        >
          {stateAddFichas ? (
            <AiOutlineMinusCircle size={16} className="me-2" />
          ) : (
            <IoMdPersonAdd size={16} className="me-2" />
          )}
          {stateAddFichas ? "Ocultar" : "Agregar"}
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
        <DataTableFichas
          fichasList={fichasList}
          getFicha={getFicha}
          deleteFichas={deleteFichas}
          setStateAddFichas={setStateAddFichas}
        />
      </div>
      <hr />
      {stateAddFichas ? (
        <FormFichas
          buttonForm={buttonForm}
          fichas={fichas}
          updateTextButton={updateTextButton}
          setUnidad={setFichas}
          getAllFichas={getAllFichas}
        />
      ) : null}
      <hr />
      <Outlet />
    </>
  );
};

export default CrudFichas;