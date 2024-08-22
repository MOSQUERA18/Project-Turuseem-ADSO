import clieteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from 'react-client-session';

import { CSVLink } from 'react-csv';

import FormFuncionarios from "./formFuncionarios.jsx";
import FormQueryFuncionarios from "./formQueryFuncionarios.jsx";
import Pagination from "../pagination.jsx";
import Alerta from "../components/Alerta.jsx";

import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { Outlet } from "react-router-dom";

const URI = "/funcionarios";

const CrudFuncionarios = () => {
  const [funcionarioList, setFuncionarioList] = useState([]);
  const [funcionarioQuery, setFuncionarioQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddFuncionario, setStateAddFuncionario] = useState(false);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(0);
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
      const respuestApi = await clieteAxios(URI, config);
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
      const respuestApi = await clieteAxios(`${URI}/${Id_Funcionario}`, config);
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
          const respuestApi = await clieteAxios.delete(
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



  const csvData = (funcionarioQuery.length ? funcionarioQuery : funcionarioList).map(funcionario => ({
    Documento : funcionario.Id_Funcionario,
    Nombre: funcionario.Nom_Funcionario,
    Apellidos : funcionario.Ape_Funcionario,
    Genero: funcionario.Genero,
    Telefono: funcionario.Tel_Funcionario,
    Estado: funcionario.Estado,
    Cargo: funcionario.Cargo,
  }));


  return (
    <>
    <br />
    <h1 className="text-center font-extrabold text-3xl text-green-700 uppercase">Gestionar Informacion de los Funcionarios</h1>

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

        <CSVLink data={csvData} filename={"Funcionarios.csv"} className="bg-green-600 px-6 py-2 rounded-xl text-white font-bold m-4 flex items-center hover:bg-green-800">
                Exportar a excel
              </CSVLink>
      </div>
      <div className="overflow-x-auto">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-lg text-gray-700">
              Buscar Por Documento...
            </h1>
            <FormQueryFuncionarios
              getFuncionario={getFuncionario}
              deleteFuncionario={deleteFuncionario}
              buttonForm={buttonForm}
              funcionarioQuery={funcionarioQuery}
              setFuncionarioQuery={setFuncionarioQuery}
            />
          </div>
        </div>
        <hr />
        {msg && <Alerta alerta={alerta} />}
        <table className="min-w-full bg-white text-center text-sm">
          <thead className="text-white bg-green-700">
            <tr className="">
              <th className="py-2 px-4 border-2 border-b-gray-500">ID</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Nombre</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Apellido</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Género</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Teléfono</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Estado</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Cargo</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(funcionarioQuery.length ? funcionarioQuery : funcionarioList).map(
              (funcionario, indice) =>
                indice >= desde && indice < hasta ? (
                  <tr
                    key={funcionario.Id_Funcionario}
                    className="odd:bg-white even:bg-gray-100 select-none"
                  >
                    <td className="py-2 px-4 border-b">
                      {funcionario.Id_Funcionario}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {funcionario.Nom_Funcionario}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {funcionario.Ape_Funcionario}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {funcionario.Genero}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {funcionario.Tel_Funcionario}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {funcionario.Estado}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {funcionario.Cargo}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => [
                          getFuncionario(funcionario.Id_Funcionario),
                          setStateAddFuncionario(true),
                        ]}
                        className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => deleteFuncionario(funcionario.Id_Funcionario)}
                        className="text-red-500 hover:text-red-700 hover:border hover:border-red-500 p-1 rounded"
                      >
                        <MdDeleteOutline />
                      </button>
                    </td>
                  </tr>
                ) : (
                  ""
                )
            )}
          </tbody>
        </table>
      </div>
      <Pagination URI={URI} setDesde={setDesde} setHasta={setHasta} />
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