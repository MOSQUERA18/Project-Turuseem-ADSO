import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";

import { exportToExcel } from "./ExportExcel.js";

import FormFuncionarios from "./formFuncionarios.jsx";
import Alerta from "../components/Alerta.jsx";
import WriteTable from "../Tables/Data-Tables.jsx";
import ModalWindow from "../ModalWindow/ModalWindow.jsx";

import { Outlet } from "react-router-dom";

const URI = "funcionarios";

const CrudFuncionarios = () => {
  const [funcionarioList, setFuncionarioList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddFuncionario, setStateAddFuncionario] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const resetForm = () => {
    setFuncionario({
      Id_Funcionario: "",
      Nom_Funcionario: "",
      Ape_Funcionario: "",
      Genero: "",
      Tel_Funcionario: "",
      Estado: "",
      Cargo: "",
    });
  };

  const [funcionario, setFuncionario] = useState({
    Id_Funcionario: "",
    Nom_Funcionario: "",
    Ape_Funcionario: "",
    Genero: "",
    Tel_Funcionario: "",
    Estado: "",
    Cargo: "",
  });
  const titleModul = ["REPORTE DE FUNCIONARIOS"];

  const titles = [
    "Documento",
    "Nombres",
    "Apellidos",
    "Género",
    "Teléfono",
    "Estado",
    "Cargo",
    "Acciones",
  ];

  const formattedData = funcionarioList.map((funcionario) => [
    funcionario.Id_Funcionario,
    funcionario.Nom_Funcionario,
    funcionario.Ape_Funcionario,
    funcionario.Genero,
    funcionario.Tel_Funcionario,
    funcionario.Estado,
    funcionario.Cargo,
  ]);

  useEffect(() => {
    getAllFuncionarios();
  }, []);

  const getAllFuncionarios = async () => {
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
        setFuncionarioList(respuestApi.data);
        setCrearDataTable(true);
      } else {
        setAlerta({
          msg: "Error al cargar los registros!",
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: "Error al cargar los registros!",
        error: true,
      });
      console.error(error);
    }
  };

  const getFuncionario = async (Id_Funcionario) => {
    setButtonForm("Actualizar");
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios.get(
        `/${URI}/${Id_Funcionario}`,
        config
      );
      if (respuestApi.status === 200) {
        setFuncionario({
          ...respuestApi.data,
        });
      } else {
        setAlerta({
          msg: "Error al cargar los registros!",
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: "Error al cargar los registros!",
        error: true,
      });
      console.error(error);
    }
  };

  const deleteFuncionario = (Id_Funcionario) => {
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
            `${URI}/${Id_Funcionario}`,
            config
          );
          if (respuestApi.status == 200) {
            getAllFuncionarios();
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

  const handleExportToExcel = () => {
    exportToExcel([], funcionarioList);
  };

  return (
    <>
      <h1 className="text-black font-extrabold text-4xl md:text-4xl text-center mb-7">
        Gestionar Informacion de los
        <span className="text-blue-700"> Funcionarios</span>
      </h1>
      <div className="flex justify-end pb-3">
        <ModalWindow
          stateAddNewRow={stateAddFuncionario}
          setStateAddNewRow={setStateAddFuncionario}
          toggleModal={toggleModal} // Aquí pasamos la función
          isOpen={isOpen}
          resetForm={resetForm}
          updateTextBottom={updateTextButton}
          form={
            <FormFuncionarios
              buttonForm={buttonForm}
              funcionario={funcionario}
              updateTextButton={updateTextButton}
              setFuncionario={setFuncionario}
              getAllFuncionarios={getAllFuncionarios}
            />
          }
        />
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
            deleteRow={deleteFuncionario}
            getRow={getFuncionario}
            setStateAddNewRow={setStateAddFuncionario}
            toggleModal={toggleModal} // Aquí pasamos la función
            isOpen={isOpen}
            titleModul={titleModul}
          />
        )}
      </div>
      <hr />
      <Outlet />
    </>
  );
};

export default CrudFuncionarios;
