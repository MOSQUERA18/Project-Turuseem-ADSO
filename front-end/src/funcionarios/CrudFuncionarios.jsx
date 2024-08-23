import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";

import FormFuncionarios from "./formFuncionarios.jsx";
import Alerta from "../components/Alerta.jsx";
import DataTableFuncionarios from "./dataTableFuncionarios.jsx";

import { IoMdPersonAdd } from "react-icons/io";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { Outlet } from "react-router-dom";

const URI = "/funcionarios";

const CrudFuncionarios = () => {
  const [funcionarioList, setFuncionarioList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddFuncionario, setStateAddFuncionario] = useState(false);
  const [alerta, setAlerta] = useState({});

  const [funcionario, setFuncionario] = useState({
    Id_Funcionario: "",
    Nom_Funcionario: "",
    Ape_Funcionario: "",
    Genero: "",
    Tel_Funcionario: "",
    Estado: "",
    Cargo: "",
  });

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
      const respuestApi = await clienteAxios(
        `${URI}/${Id_Funcionario}`,
        config
      );
      if (respuestApi.status === 200) {
        setFuncionario({
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
          console.log(respuestApi);

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

  return (
    <>
      <h1 className="text-center font-extrabold text-3xl text-green-700 uppercase">
        Funcionarios
      </h1>
      <div className="flex justify-end pb-3">
        <button
          className="bg-green-600 px-6 py-2 rounded-xl text-white font-bold m-4 flex items-center hover:bg-green-800"
          onClick={() => {
            setStateAddFuncionario(!stateAddFuncionario);
          }}
        >
          {stateAddFuncionario ? (
            <AiOutlineMinusCircle size={16} className="me-2" />
          ) : (
            <IoMdPersonAdd size={16} className="me-2" />
          )}
          {stateAddFuncionario ? "Ocultar" : "Agregar"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <hr />
        {msg && <Alerta alerta={alerta} />}
        <hr />
        <DataTableFuncionarios
          funcionarioList={funcionarioList}
          getFuncionario={getFuncionario}
          deleteFuncionario={deleteFuncionario}
          setStateAddFuncionario={setStateAddFuncionario}
        />
      </div>
      <hr />
      {stateAddFuncionario ? (
        <FormFuncionarios
          buttonForm={buttonForm}
          funcionario={funcionario}
          updateTextButton={updateTextButton}
          setFuncionario={setFuncionario}
          getAllFuncionarios={getAllFuncionarios}
        />
      ) : null}
      <hr />
      <Outlet />
    </>
  );
};

export default CrudFuncionarios;
