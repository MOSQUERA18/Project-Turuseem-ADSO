import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";

import FormTurnosEspeciales from "./FormTurnosEspeciales.jsx";

import Alerta from "../components/Alerta.jsx";
import WriteTable from "../Tables/Data-Tables.jsx";
import ModalWindow from "../ModalWindow/ModalWindow.jsx";

import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const URI = "/turnoespecial";
const URI_FOTOS = "/public/uploads/";
const URI_AXIOS = import.meta.env.VITE_BACKEND_URL;

const CrudTurnosEspeciales = () => {
  const [turnoEspecialList, setTurnoEspecialList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddturnoEspecial, setStateAddturnoEspecial] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [stateButton, setStateButton] = useState(true);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const resetForm = () => {
    setTurnoEspecial({
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
  };
  const [turnoEspecial, setTurnoEspecial] = useState({
    Id_TurnoEspecial: "",
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

  const titleModul = ["REPORTE DE TURNOS ESPECIALES"];
  const titleForm = ["CREAR TURNOS ESPECIALES"];
  const tableName = "TurnosEspeciales";

  const shouldShowPhoto = turnoEspecialList.some(
    (row) => row.Img_Asistencia !== undefined
  );
  const titles = [
    "Identificador del Turno",
    "Fecha Turno",
    "Hora Inicio",
    "Hora Fin",
    "Observaciones del Turno",
    "Total Aprendices que asistieron",
    "Ficha",
    // "Imagen Asistencia",
    "Documento Funcionario",
    "Nombre Funcionario",
    "Nombre Unidad",
    "Asistencia",
    shouldShowPhoto && "Archivo Asistencia",
    "Acciones",
  ].filter(Boolean);

  const ButtonsForOtherModules = (Id_TurnoEspecial) => [
    <button
      onClick={() => [
        getTurnoEspecial(Id_TurnoEspecial),
        setStateAddturnoEspecial(true),
        toggleModal(),
        setStateButton(false),
      ]}
      className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
      key="get"
    >
      <FaRegEdit />
    </button>,
    <button
      onClick={() => deleteTurnoEspecial(Id_TurnoEspecial)}
      className="text-red-500 hover:text-red-700 hover:border hover:border-red-500 p-1 rounded"
      key="delete"
    >
      <MdDeleteOutline />
    </button>,
  ];

  const formattedData = turnoEspecialList.map((turnoEspecial) => {
    const rowData = [
      turnoEspecial.Id_TurnoEspecial,
      turnoEspecial.Fec_TurnoEspecial,
      turnoEspecial.Hor_Inicio,
      turnoEspecial.Hor_Fin,
      turnoEspecial.Obs_TurnoEspecial,
      turnoEspecial.Tot_AprendicesAsistieron,
      turnoEspecial.Id_Ficha,
      turnoEspecial.Id_Funcionario,
      turnoEspecial.funcionario.Nom_Funcionario,
      turnoEspecial.unidad.Nom_Unidad,
    ];

    const Asistencia = () => {
      return (
        <label className="inline-flex items-center cursor-pointer">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-300 me-2 uppercase">
            No
          </span>
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onClick={() => console.log("Holaaaaaaaaaaaaaa")}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 uppercase">
            Si
          </span>
        </label>
      );
    };
    
    // Ejemplo de cómo insertar el componente Asistencia en la posición 10 de rowData
    rowData.splice(10, 0, <Asistencia />);
    
    if (shouldShowPhoto) {
      rowData.push(
        <img
          width="80px"
          src={`${URI_AXIOS}${URI_FOTOS}${turnoEspecial.Img_Asistencia}`}
          alt="No Foto"
        />
      );
    }
    rowData.push(ButtonsForOtherModules(turnoEspecial.Id_TurnoEspecial));

    return rowData;
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
        setCrearDataTable(true);
      } else {
        setAlerta({
          msg: `Error al cargar los registros!`,
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: `Error!!! no existen turnos especiales registrados!`,
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
      <h1 className="text-zinc-950 font-extrabold text-4xl md:text-4xl text-center mb-7">
        Gestionar Informacion de los
        <span className="text-botones"> Turnos Especiales</span>
      </h1>

      <div className="flex pb-3">
        <ModalWindow
          stateAddNewRow={stateAddturnoEspecial}
          setStateAddNewRow={setStateAddturnoEspecial}
          toggleModal={toggleModal} // Aquí pasamos la función
          isOpen={isOpen}
          resetForm={resetForm}
          updateTextButtom={updateTextButton}
          titleForm={titleForm}
          setStateButton={setStateButton}
          form={
            <FormTurnosEspeciales
              buttonForm={buttonForm}
              turnoEspecial={turnoEspecial}
              updateTextButton={updateTextButton}
              getAllTurnosEspeciales={getAllTurnosEspeciales}
              stateButton={stateButton}
              setStateButton={setStateButton}
            />
          }
        />
      </div>

      <div className="overflow-x-auto">
        {msg && <Alerta alerta={alerta} />}
        <hr />
        {crearDataTable && (
          <WriteTable
            titles={titles}
            data={formattedData}
            titleModul={titleModul}
            tableName={tableName}
          />
        )}
      </div>
    </>
  );
};

export default CrudTurnosEspeciales;
