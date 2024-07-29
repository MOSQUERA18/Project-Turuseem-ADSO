import clieteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import FormApprentices from "./formApprentices.jsx";
import FormQueryApprentices from "./formQueryApprentices.jsx";
import ModalDialog from "./modalDialog.jsx";
import Pagination from "../pagination.jsx";
import ImportarCSV from "./importarCSV.jsx";
import Alerta from "../components/Alerta.jsx";

import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { Outlet } from "react-router-dom";

const URI = "/aprendiz/";

const CrudApprentices = () => {
  const [apprenticeList, setApprenticeList] = useState([]);
  const [apprenticeQuery, setApprenticeQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddApprentice, setStateAddApprentice] = useState(false);
  const [onDoubleClickAppretice, setOnDoubleClickAppretice] = useState({});
  const [modalDialog, setModalDialog] = useState(false);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(0);
  const [alerta, setAlerta] = useState({});

  const [apprentice, setApprentice] = useState({
    Id_Aprendiz: "",
    Nom_Aprendiz: "",
    Ape_Aprendiz: "",
    Id_Ficha: "",
    Fec_Nacimiento: "",
    Gen_Aprendiz: "",
    Cor_Aprendiz: "",
    Tel_Aprendiz: "",
    Tot_Memorandos: "",
    Tot_Inasistencias: "",
    Patrocinio: "",
    CentroConvivencia: "",
  });

  useEffect(() => {
    getAllApprentices();
  }, []);

  const getAllApprentices = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clieteAxios.get(`/aprendiz`, config);
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
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clieteAxios(`/aprendiz/${Id_Aprendiz}`, config);
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
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const respuestApi = await clieteAxios.delete(
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
      </div>
      <div className="overflow-x-auto">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-lg text-gray-700">
              Buscar Por Nombre o Documento...
            </h1>
            <FormQueryApprentices
              getApprentice={getApprentice}
              deleteApprentice={deleteApprentice}
              buttonForm={buttonForm}
              apprenticeQuery={apprenticeQuery}
              setApprenticeQuery={setApprenticeQuery}
            />
          </div>
          <div>
            <h1 className="font-semibold text-lg text-gray-700">
              Subir Archivo CSV
            </h1>
            <ImportarCSV URI={URI} />
          </div>
        </div>
        <hr />
        <h2 className="font-semibold mb-4 text-lg text-gray-700 mt-3">
          Doble Click sobre el aprendiz para ver informacion detallada...
        </h2>
        {msg && <Alerta alerta={alerta} />}
        <table className="min-w-full bg-white text-center text-sm">
          <thead className="text-white bg-green-700">
            <tr className="">
              <th className="py-2 px-4 border-2 border-b-gray-500">
                Documento
              </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Nombres</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">
                Apellidos
              </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Ficha</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Genero</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Correo</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Telefono</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(apprenticeQuery.length ? apprenticeQuery : apprenticeList).map(
              (apprentice, indice) =>
                indice >= desde && indice < hasta ? (
                  <tr
                    key={apprentice.Id_Aprendiz}
                    className="odd:bg-white even:bg-gray-100 select-none"
                    onDoubleClick={() => [
                      setOnDoubleClickAppretice(apprentice),
                      setModalDialog(true),
                    ]}
                  >
                    <td className="py-2 px-4 border-b">
                      {apprentice.Id_Aprendiz}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {apprentice.Nom_Aprendiz}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {apprentice.Ape_Aprendiz}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {apprentice.Id_Ficha}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {apprentice.Gen_Aprendiz}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {apprentice.Cor_Aprendiz}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {apprentice.Tel_Aprendiz}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => [
                          getApprentice(apprentice.Id_Aprendiz),
                          setStateAddApprentice(true),
                        ]}
                        className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => deleteApprentice(apprentice.Id_Aprendiz)}
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
      {stateAddApprentice ? (
        <FormApprentices
          buttonForm={buttonForm}
          apprentice={apprentice}
          updateTextButton={updateTextButton}
          setApprentice={setApprentice}
        />
      ) : null}
      <hr />

      {modalDialog ? (
        <ModalDialog
          getApprentice={getApprentice}
          deleteApprentice={deleteApprentice}
          onDoubleClickAppretice={onDoubleClickAppretice}
          setModalDialog={setModalDialog}
          setStateAddApprentice={setStateAddApprentice}
          setApprentice={setApprentice}
        />
      ) : null}
      <Outlet />
    </>
  );
};

export default CrudApprentices;
