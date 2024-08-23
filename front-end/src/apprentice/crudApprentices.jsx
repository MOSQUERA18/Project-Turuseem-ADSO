import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from 'react-client-session';

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

const URIFOTOS = "http://localhost:8000/public/uploads"


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
    Id_Ciudad:"",
    Lugar_Residencia:"",
    Edad:"",
    Hijos:"",
    Nom_Eps:"",
    Tel_Padre:"",
    Gen_Aprendiz: "",
    Cor_Aprendiz: "",
    Tel_Aprendiz: "",
    Tot_Memorandos: "",
    Tot_Inasistencias: "",
    Patrocinio: "",
    Estado:"",
    Nom_Empresa:"",
    CentroConvivencia: "",
    Foto_Aprendiz: null
  });

  

  useEffect(() => {
    getAllApprentices();
  }, []);

  const getAllApprentices = async () => {
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios.get(`/aprendiz`, config);
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
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios(`/aprendiz/${Id_Aprendiz}`, config);
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
        const token = ReactSession.get("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const respuestApi = await clienteAxios.delete(
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
            getAllApprentices();
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
    <h1 className="text-center font-extrabold text-3xl text-green-700 uppercase">Gestionar Informacion de los Aprendices</h1>
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
              <th className="py-2 px-4 border-2 border-b-gray-500">Apellidos</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Ficha</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Fecha de Nacimiento </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Ciudad </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Lugar Residencia </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Edad </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Hijos </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Nombre EPS </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Telefono Padre </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Genero</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Correo</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Telefono Aprendiz</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Total Memorandos</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Total Inasistencias</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Patrocinio</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Estado</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Nombre Empresa</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Centro Convivencia</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Foto Aprendiz</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(apprenticeQuery.length ? apprenticeQuery : apprenticeList).map(
              (apprentice, indice) =>
                indice >= desde && indice < hasta ? (
                  <tr
                    key={apprentice.Id_Aprendiz}
                    className={apprentice.Estado === "1" ? "bg-red-500" : ""}
                    onDoubleClick={() => [
                      setOnDoubleClickAppretice(apprentice),
                      setModalDialog(true),
                    ]}
                  >
                    <td className="py-2 px-4 border-b">{apprentice.Id_Aprendiz}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Nom_Aprendiz}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Ape_Aprendiz}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Id_Ficha}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Fec_Nacimiento}</td>
                        <td className="py-2 px-4 border-b">{apprentice.ciudades.Nom_Ciudad}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Lugar_Residencia}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Edad}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Hijos}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Nom_Eps}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Tel_Padre}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Gen_Aprendiz}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Cor_Aprendiz}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Tel_Aprendiz}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Tot_Memorandos}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Tot_Inasistencias}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Patrocinio}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Estado}</td>
                        <td className="py-2 px-4 border-b">{apprentice.Nom_Empresa}</td>
                        <td className="py-2 px-4 border-b">{apprentice.CentroConvivencia}</td>
                        <td className="py-2 px-4 border-b">
                                {apprentice.Foto_Aprendiz ? (
                                    <img width="80px" src={`${URIFOTOS}/${apprentice.Foto_Aprendiz}`} alt="Imagen de el Aprendiz" />
                                ) : (
                                    <span>No Tiene IMG</span>
                                )}
                            </td>

                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => [
                          getApprentice(apprentice.Id_Aprendiz),
                          setStateAddApprentice(true)
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