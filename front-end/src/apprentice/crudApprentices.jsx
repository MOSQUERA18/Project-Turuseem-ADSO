import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from 'react-client-session';

import FormApprentices from "./formApprentices.jsx";
import ImportarCSV from "./importarCSV.jsx";
import Alerta from "../components/Alerta.jsx";

import DataTableApprentices from "./dataTableApprentices.jsx";
import { IoMdPersonAdd } from "react-icons/io";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { Outlet } from "react-router-dom";

const URI = "/aprendiz/";

const URIFOTOS = "/public/uploads/"


const CrudApprentices = () => {
  const [apprenticeList, setApprenticeList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddApprentice, setStateAddApprentice] = useState(false);
  const [alerta, setAlerta] = useState({});

  const [apprentice, setApprentice] = useState({
    Id_Aprendiz: "",
    Nom_Aprendiz: "",
    Ape_Aprendiz: "",
    Id_Ficha: "",
    Fec_Nacimiento: "",
    Id_Ciudad:"",
    Lugar_Residencia:"",
    Edad:"",
    Hijos:"",
    Nom_Eps:"",
    Tel_Padre:"",
    Gen_Aprendiz: "",
    Cor_Aprendiz: "",
    Tel_Aprendiz: "",
    Tot_Memorandos: "",
    Tot_Inasistencias: "",
    Patrocinio: "",
    Estado:"",
    Nom_Empresa:"",
    CentroConvivencia: "",
    Foto_Aprendiz: ""
  });

  

  useEffect(() => {
    getAllApprentices();
  }, []);

  const getAllApprentices = async () => {
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios.get(`/aprendiz`, config);
      if (respuestApi.status === 200) {
        setApprenticeList(respuestApi.data);
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

  const getApprentice = async (Id_Aprendiz) => {
    setButtonForm("Actualizar");
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios(`/aprendiz/${Id_Aprendiz}`, config);
      if (respuestApi.status === 200) {
        setApprentice({
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

  const deleteApprentice = (Id_Aprendiz) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Borrar!",
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
            `/aprendiz/${Id_Aprendiz}`,
            config
          );
          if (respuestApi.status == 200) {
            updateTextButton("Enviar");
            Swal.fire({
              title: "Borrado!",
              text: "El registro ha sido borrado.",
              icon: "success",
            });
            getAllApprentices();
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

  return (
    <>
    <br />
    <h1 className="text-center font-extrabold text-3xl text-green-700 uppercase">Gestionar Informacion de los Aprendices</h1>
      <div className="flex justify-end pb-3">
        <button
          className="bg-green-600 px-6 py-2 rounded-xl text-white font-bold m-4 flex items-center hover:bg-green-800"
          onClick={() => {
            setStateAddApprentice(!stateAddApprentice);
          }}
        >
          {stateAddApprentice ? (
            <AiOutlineMinusCircle size={16} className="me-2" />
          ) : (
            <IoMdPersonAdd size={16} className="me-2" />
          )}
          {stateAddApprentice ? "Ocultar" : "Agregar"}
        </button>

        <a
          href="/src/Archivos CSV/Aprendiz.csv"
          download="Aprendiz.csv"
          className="bg-green-600 px-6 py-2 rounded-xl text-white font-bold m-4 flex items-center hover:bg-green-800"
        >
          Descargar CSV
        </a>  
      </div>
      <div className="overflow-x-auto">
        <div className="flex justify-between">

          <div>
            <h1 className="font-semibold text-lg text-gray-700">
              Subir Archivo CSV
            </h1>
            <ImportarCSV URI={URI} />
          </div>
        </div>
        <hr />

<br />
        {msg && <Alerta alerta={alerta} />}
        <hr />

        <DataTableApprentices
          apprenticeList={apprenticeList}
          getApprentice={getApprentice}
          deleteApprentice={deleteApprentice}
          setStateAddApprentice={setStateAddApprentice}
          URIFOTOS={URIFOTOS}
        />

      </div>

      <hr />
      {stateAddApprentice ? (
        <FormApprentices
          buttonForm={buttonForm}
          apprentice={apprentice}
          updateTextButton={updateTextButton}
          setApprentice={setApprentice}
        />
      ) : null}
      <hr />
      <Outlet />
    </>
  );
};

export default CrudApprentices;