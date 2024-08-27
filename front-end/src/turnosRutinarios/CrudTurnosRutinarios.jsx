import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";
import FormTurnosRutinarios from "./FormTurnosRutinarios.jsx";
import DataTableTurnosRutinarios from "./dataTableTurnosRutinarios.jsx";
import Alerta from "../components/Alerta.jsx";
import { IoMdPersonAdd } from "react-icons/io";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { Outlet } from "react-router-dom";

const URI = "/turnorutinario";

const CrudTurnosRutinarios = () => {
  const [turnoRutinarioList, setTurnoRutinarioList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddturnoRutinario, setStateAddturnoRutinario] = useState(false);
  const [alerta, setAlerta] = useState({});

  const [turnoRutinario, setTurnoRutinario] = useState({
    Fec_InicioTurno: "",
    Fec_FinTurno: "",
    Hor_InicioTurno: "",
    Hor_FinTurno: "",
    Obs_TurnoRutinario: "",
    Ind_Asistencia: "",
    Id_Aprendiz: "",
    Id_Unidad: "",
  });

  useEffect(() => {
    getAllTurnosRutinarios();
  }, []);

  const getAllTurnosRutinarios = async () => {
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
        setTurnoRutinarioList(respuestApi.data);
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
  const getTurnoRutinario = async (Id_TurnoRutinario) => {
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
        `${URI}/${Id_TurnoRutinario}`,
        config
      );
      if (respuestApi.status === 200) {
        setTurnoRutinario({
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

  const deleteTurnoRutinario = (Id_TurnoRutinario) => {
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
            `${URI}/${Id_TurnoRutinario}`,
            config
          );
          if (respuestApi.status === 200) {
            getAllTurnosRutinarios(); // Refrescar la lista después de borrar
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
      Gestionar Informacion de los Turnos Rutinarios
      </h1>
      <div className="flex justify-end pb-3">
        <button
          className="bg-green-600 px-6 py-2 rounded-xl text-white font-bold m-4 flex items-center hover:bg-green-800"
          onClick={() => {
            setStateAddturnoRutinario(!stateAddturnoRutinario);
          }}
        >
          {stateAddturnoRutinario ? (
            <AiOutlineMinusCircle size={16} className="me-2" />
          ) : (
            <IoMdPersonAdd size={16} className="me-2" />
          )}
          {stateAddturnoRutinario ? "Ocultar" : "Agregar"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <hr />
        {msg && <Alerta alerta={alerta} />}
        <hr />
        <DataTableTurnosRutinarios
          turnoRutinarioList={turnoRutinarioList}
          getTurnoRutinario={getTurnoRutinario}
          deleteTurnoRutinario={deleteTurnoRutinario}
          setStateAddturnoRutinario={setStateAddturnoRutinario}
        />
      </div>
      <hr />
      {stateAddturnoRutinario ? (
        <FormTurnosRutinarios
          buttonForm={buttonForm}
          turnoRutinario={turnoRutinario}
          updateTextButton={updateTextButton}
          getAllTurnosRutinarios={getAllTurnosRutinarios}
        />
      ) : null}
      <hr />
      <Outlet />
    </>
  );
};

export default CrudTurnosRutinarios;