import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";
import FormTurnosRutinarios from "./FormTurnosRutinarios.jsx";
import Alerta from "../components/Alerta.jsx";
import WriteTable from "../Tables/Data-Tables.jsx";
import { Outlet } from "react-router-dom";
import ModalWindow from "../ModalWindow/ModalWindow.jsx";

const URI = "/turnorutinario/";

const CrudTurnosRutinarios = () => {
  const [turnoRutinarioList, setTurnoRutinarioList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddturnoRutinario, setStateAddturnoRutinario] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const resetForm = () => {
    setTurnoRutinario({
      Fec_InicioTurno: "",
      Fec_FinTurno: "",
      Hor_InicioTurno: "",
      Hor_FinTurno: "",
      Obs_TurnoRutinario: "",
      Ind_Asistencia: "",
      Id_Aprendiz: "",
      Id_Unidad: "",
    });
  };

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

  const titleModul = ["REPORTE DE TURNOS RUTINARIOS"];
  const titleForm = ["CREAR TURNOS RUTINARIOS"];


  const titles = [
    "ID",
    "Fecha Inicio",
    "Fecha Fin",
    "Hora Inicio Turno",
    "Hora Fin Turno",
    "Observaciones del Turno",
    "Indicador Asistencia",
    "Documento Aprendiz",
    "Nombre Unidad",
    // shouldShowPhoto && "Foto Aprendiz",
    "Acciones",
  ].filter(Boolean);

  const formattedData = turnoRutinarioList.map((turnoRutinario) => {
    const rowData = [
      turnoRutinario.Id_TurnoRutinario,
      turnoRutinario.Fec_InicioTurno,
      turnoRutinario.Fec_FinTurno,
      turnoRutinario.Hor_InicioTurno,
      turnoRutinario.Hor_FinTurno,
      turnoRutinario.Obs_TurnoRutinario,
      turnoRutinario.Ind_Asistencia,
      turnoRutinario.Id_Aprendiz,
      turnoRutinario.unidad?.Nom_Unidad,
    ];
    return rowData;
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
        setCrearDataTable(true);
      } else {
        setAlerta({
          msg: `Error al cargar los registros!`,
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: `Ocurrió un error!`,
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
        setTurnoRutinario(respuestApi.data);
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
    if (!Id_TurnoRutinario) {
      console.error("El ID del turno rutinario no es válido");
      return;
    }
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
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
            // Actualiza el estado para eliminar el turno de la tabla
            setTurnoRutinarioList(
              turnoRutinarioList.filter(
                (turno) => turno.id !== Id_TurnoRutinario
              )
            );
            Swal.fire({
              title: "Borrado!",
              text: "El registro ha sido borrado.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: respuestApi.data.message,
              icon: "error",
            });
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
      <h1 className="text-black font-extrabold text-4xl md:text-4xl text-center mb-7">
        Gestionar Información de los{" "}
        <span className="text-blue-700"> Turnos Rutinarios</span>
      </h1>

      <div className="flex pb-3">
        <ModalWindow
          stateAddNewRow={stateAddturnoRutinario}
          setStateAddNewRow={setStateAddturnoRutinario}
          toggleModal={toggleModal} // Aquí pasamos la función
          isOpen={isOpen}
          resetForm={resetForm}
          updateTextBottom={updateTextButton}
          titleForm={titleForm}
          form={
            <FormTurnosRutinarios
              buttonForm={buttonForm}
              turnoRutinario={turnoRutinario}
              updateTextButton={updateTextButton}
              getAllTurnosRutinarios={getAllTurnosRutinarios}
            />
          }
        />
      </div>

      <div className="overflow-x-auto">
        <hr />
        {msg && <Alerta alerta={alerta} />}

        {crearDataTable && (
          <WriteTable
            titles={titles}
            data={formattedData}
            deleteRow={deleteTurnoRutinario}
            getRow={getTurnoRutinario}
            setStateAddNewRow={setStateAddturnoRutinario}
            toggleModal={toggleModal} // Aquí pasamos la función
            titleModul={titleModul}
          />
        )}
      </div>
      <hr />
      <Outlet />
    </>
  );
};

export default CrudTurnosRutinarios;
