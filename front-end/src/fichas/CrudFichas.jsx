import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";

import FormFichas from "./formFichas.jsx";
import Alerta from "../components/Alerta.jsx";

import WriteTable from "../Tables/Data-Tables.jsx";
import ModalWindow from "../ModalWindow/ModalWindow.jsx";

const URI = "/fichas/";

const CrudFichas = () => {
  const [fichasList, setFichasList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddFichas, setStateAddFichas] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const resetForm = () => {
    setFichas({
      Id_Ficha: "",
      Fec_IniEtapaLectiva: "",
      Fec_FinEtapaLectiva: "",
      Can_Aprendices: "",
      Id_ProgramaFormacion: "",
      Estado: "",
    });
  };

  const [fichas, setFichas] = useState({
    Id_Ficha: "",
    Fec_InicioEtapaLectiva: "",
    Fec_FinEtapaLectiva: "",
    Can_Aprendices: "",
    Id_ProgramaFormacion: "",
    Estado: "",
  });
  const titleModul = ["REPORTE DE FICHAS"];
  const titleForm = ["REGISTRAR FICHAS"];
    const tableName = "Fichas"

  const titles = [
    "Numero Ficha",
    "Fecha Inicio Etapa Lectiva",
    "Fecha Fin Etapa Lectiva",
    "Cantidad Aprendices",
    "Programa de Formación",
    "Estado",
    "Acciones",
  ].filter(Boolean);

  const formatteData = fichasList.map((fichas) => {
    const rowData = [
      fichas.Id_Ficha,
      fichas.Fec_InicioEtapaLectiva,
      fichas.Fec_FinEtapaLectiva,
      fichas.Can_Aprendices,
      fichas.programasFormacion?.Nom_ProgramaFormacion,
      fichas.Estado,
    ];
    return rowData;
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
        setCrearDataTable(true);
      } else {
        setAlerta({
          msg: `Error al cargar los registros!`,
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: `No Existen Fichas Registradas!`,
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

  return (
    <>
      <h1 className="text-black font-extrabold text-4xl md:text-4xl text-center mb-7">
        Gestionar Informacion de las
        <span className="text-blue-700"> Fichas</span>
      </h1>
      <div className="flex pb-3">
        <hr />
        <ModalWindow
          stateAddNewRow={stateAddFichas}
          setStateAddNewRow={setStateAddFichas}
          toggleModal={toggleModal} // Aquí pasamos la función
          isOpen={isOpen}
          resetForm={resetForm}
          updateTextBottom={updateTextButton}
          titleForm={titleForm}
          form={
            <FormFichas
              buttonForm={buttonForm}
              fichas={fichas}
              updateTextButton={updateTextButton}
              setUnidad={setFichas}
              getAllFichas={getAllFichas}
              toggleModal={toggleModal} // Aquí pasamos la función
              isOpen={isOpen}
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
            deleteRow={deleteFichas}
            getRow={getFicha}
            setStateAddNewRow={setStateAddFichas}
            toggleModal={toggleModal} // Aquí pasamos la función
            titleModul={titleModul}
            tableName={tableName}
          />
        )}
      </div>
    </>
  );
};

export default CrudFichas;
