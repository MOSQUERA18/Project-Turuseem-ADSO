import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";

import FormTurnosEspeciales from "./FormTurnosEspeciales.jsx";
import DataTableTurnosEspeciales from "./dataTableTurnosEspeciales.jsx";
import Alerta from "../components/Alerta.jsx";

import { IoMdPersonAdd } from "react-icons/io";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { Outlet } from "react-router-dom";

const URI = "/turnoespecial";
const URI_FOTOS = '/public/uploads/'

const CrudTurnosEspeciales = () => {
  const [turnoEspecialList, setTurnoEspecialList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddturnoEspecial, setStateAddturnoEspecial] = useState(false);
  const [alerta, setAlerta] = useState({});

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

  return (
    <>
      <h1 className="text-center font-extrabold text-3xl text-green-700 uppercase">
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
      </div>
      <div className="overflow-x-auto">
        <hr />
        {msg && <Alerta alerta={alerta} />}
        <hr />
        <DataTableTurnosEspeciales
          turnoEspecialList={turnoEspecialList}
          getTurnoEspecial={getTurnoEspecial}
          deleteTurnoEspecial={deleteTurnoEspecial}
          setStateAddturnoEspecial={setStateAddturnoEspecial}
          URI_FOTOS={URI_FOTOS}
        />
      </div>
      <hr />
      {stateAddturnoEspecial ? (
        <FormTurnosEspeciales
          buttonForm={buttonForm}
          turnoEspecial={turnoEspecial}
          updateTextButton={updateTextButton}
          // setTurnoEspecial={setTurnoEspecial}
          getAllTurnosEspeciales={getAllTurnosEspeciales}
        />
      ) : null}
      <hr />
      <Outlet />
    </>
  );
};

export default CrudTurnosEspeciales;