import clieteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";

// import { CSVLink } from 'react-csv';

import FormProgramaFormacion from "./formProgramaFormacion.jsx";
import Alerta from "../components/Alerta.jsx";
import { Outlet } from "react-router-dom";
import ModalWindow from "../ModalWindow/ModalWindow.jsx";
import WriteTable from "../Tables/Data-Tables.jsx";

// import { exportToExcel } from './exportExcel.js';

const URI = "programa";

const CrudPrograma = () => {
  const [programaList, setProgramaList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddPrograma, setStateAddPrograma] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const resetForm = () => {
    setPrograma({
      Nom_ProgramaFormacion: "",
      Tip_ProgramaFormacion: "",
      Id_Area: "",
    });
  };

  const [programa, setPrograma] = useState({
    Nom_ProgramaFormacion: "",
    Tip_ProgramaFormacion: "",
    Id_Area: "",
  });
  const titleModul = ["REPORTE DE PROGRAMAS DE FORMACION"];
  const titleForm = ["REGISTRAR PROGRAMAS DE FORMACION"];

  const titles = [
    "Documento",
    "Nombre del Programa",
    "Tipo del Programa",
    "Área",
    "Acción",
  ].filter(Boolean);

  const formatteData = programaList.map((programa) => {
    const rowData = [
      programa.Id_ProgramaFormacion,
      programa.Nom_ProgramaFormacion,
      programa.Tip_ProgramaFormacion,
      programa.areas?.Nom_Area,
    ];
    return rowData;
  });

  useEffect(() => {
    getAllProgramas();
  }, []);

  const getAllProgramas = async () => {
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clieteAxios(URI, config);
      if (respuestApi.status === 200) {
        setProgramaList(respuestApi.data);
        setCrearDataTable(true);
      } else {
        setAlerta({
          msg: `Error al cargar los programas!`,
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: `Error al cargar los programas!`,
        error: true,
      });
      console.error(error);
    }
  };

  const getPrograma = async (Id_ProgramaFormacion) => {
    setButtonForm("Actualizar");
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clieteAxios(
        `${URI}/${Id_ProgramaFormacion}`,
        config
      );
      if (respuestApi.status === 200) {
        setPrograma({
          ...respuestApi.data,
        });
      } else {
        setAlerta({
          msg: `Error al cargar los programas!`,
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: `Error al cargar los programas!`,
        error: true,
      });
      console.error(error);
    }
  };

  const deletePrograma = (Id_ProgramaFormacion) => {
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
          const respuestApi = await clieteAxios.delete(
            `/${URI}/${Id_ProgramaFormacion}`,
            config
          );
          if (respuestApi.status === 200) {
            getAllProgramas(); // Refrescar la lista después de borrar
            Swal.fire({
              title: "Borrado!",
              text: "El programa ha sido borrado.",
              icon: "success",
            });
          } else {
            alert(respuestApi.data.message);
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Hubo un problema al intentar borrar el programa.",
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
        {" "}
        Gestionar Informacion de los{" "}
        <span className="text-blue-700"> Programas de Formacion</span>
      </h1>
      <div className="flex pb-3">
        <ModalWindow
          stateAddNewRow={stateAddPrograma}
          setStateAddNewRow={setStateAddPrograma}
          resetForm={resetForm}
          toggleModal={toggleModal} // Aquí pasamos la función
          isOpen={isOpen}
          updateTextBottom={updateTextButton}
          titleForm={titleForm}
          form={
            <FormProgramaFormacion
              buttonForm={buttonForm}
              programa={programa}
              updateTextButton={updateTextButton}
              setPrograma={setPrograma}
              getAllProgramas={getAllProgramas}
            />
          }
        />
      </div>

      <div className="overflow-x-auto">
        <hr />
        {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}

        {crearDataTable && (
          <WriteTable
            titles={titles}
            data={formatteData}
            deleteRow={deletePrograma}
            getRow={getPrograma}
            setStateAddNewRow={setStateAddPrograma}
            toggleModal={toggleModal} // Aquí pasamos la función
            titleModul={titleModul}
          />
        )}
      </div>

      <Outlet />
    </>
  );
};

export default CrudPrograma;
