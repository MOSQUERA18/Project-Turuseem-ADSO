import clieteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import FormFichas from "./formFichas.jsx";
import FormQueryFichas from "./formQueryFichas.jsx";
// import ModalDialog from "./modalDialog.jsx";
import Pagination from "../pagination.jsx";
// import ImportarCSV from "./importarCSV.jsx";
import Alerta from "../components/Alerta.jsx";

import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { Outlet } from "react-router-dom";

const URI = "fichas";

const CrudFichas = () => {
  const [fichasList, setFichasList] = useState([]);
  const [fichasQuery, setFichasQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddFichas, setStateAddFichas] = useState(false);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(0);
  const [alerta, setAlerta] = useState({});

  const [fichas,setFichas] = useState({
    Id_Ficha :"",
    Fec_IniEtapaLectiva:"",
    Fec_FinEtapaLectiva:"",
    Can_Aprendices:"",
    Id_ProgramaFormacion:"",
    Estado:"",
  });

  useEffect(() => {
    getAllFichas();
    
  }, []);

  const getAllFichas = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clieteAxios(URI, config);
      if (respuestApi.status === 200) {
        setFichasList(respuestApi.data);
      } else {
        setAlerta({
          msg: `Error al cargar los registros!`,
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: `Error al cargar las Ficha!`,
        error: true,
      });
      console.error(error);
    }
  };

  const getFicha = async (Id_Ficha) => {
    setButtonForm("Actualizar");
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clieteAxios(`${URI}/${Id_Ficha}`, config);
      if (respuestApi.status === 200) {
        setFichas({
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
        msg: `Error al Tratar de Cargar Las Fichas al Form`,
        error: true,
      });
      console.error(error);
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
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const respuestApi = await clieteAxios.delete(
            `/${URI}/${Id_Ficha}`,
            config
          );
          if (respuestApi.status === 200) {
            getAllFichas();  // Refrescar la lista después de borrar
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
            setStateAddFichas(!stateAddFichas);
          }}
        >
          {stateAddFichas ? (
            <AiOutlineMinusCircle size={16} className="me-2" />
          ) : (
            <IoMdPersonAdd size={16} className="me-2" />
          )}
          {stateAddFichas ? "Ocultar" : "Agregar"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-lg text-gray-700">
              Buscar Por Numero de Ficha...
            </h1>
            <FormQueryFichas
              getFicha={getFicha}
              deleteFichas={deleteFichas}
              buttonForm={buttonForm}
              fichasQuery={fichasQuery}
              setFichasQuery={setFichasQuery}
            />
          </div>
          {/* <div>
            <h1 className="font-semibold text-lg text-gray-700">
              Subir Archivo CSV
            </h1>
            <ImportarCSV URI={URI} />
          </div> */}
        </div>
        <hr />
        {/* <h2 className="font-semibold mb-4 text-lg text-gray-700 mt-3">
          Doble Click sobre la unidad para ver información detallada...
        </h2> */}
        {msg && <Alerta alerta={alerta} />}
        <table className="min-w-full bg-white text-center text-sm">
          <thead className="text-white bg-green-700">
            <tr className="">
              <th className="py-2 px-4 border-2 border-b-gray-500">Numero de Ficha</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Fecha Inicio Etapa Lectiva</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Fecha Fin Etapa Lectiva</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Cantidad De Aprendices</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Nombre del Programa de Formacion</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Estado De la Ficha</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(fichasQuery.length ? fichasQuery : fichasList).map(
              (fichas, indice) =>
                indice >= desde && indice < hasta ? (
                  <tr
                    key={fichas.Id_Ficha}
                    className="odd:bg-white even:bg-gray-100 select-none"
                    // onDoubleClick={() => [
                    //   // setOnDoubleClickUnidad(unidad),
                    //   setModalDialog(true),
                    // ]}
                  >
                    <td className="py-2 px-4 border-b">
                      {fichas.Id_Ficha} 
                    </td>
                    <td className="py-2 px-4 border-b">
                      {fichas.Fec_InicioEtapaLectiva}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {fichas.Fec_FinEtapaLectiva}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {fichas.Can_Aprendices}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {fichas.programasFormacion.Nom_ProgramaFormacion} {/* Puedes reemplazar esto por el nombre del área si lo tienes disponible */}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {fichas.Estado}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => [
                          getFicha(fichas.Id_Ficha),
                          setStateAddFichas(true),
                        ]}
                        className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => deleteFichas(fichas.Id_Ficha)}
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
      {stateAddFichas ? (
        <FormFichas
          buttonForm={buttonForm}
          fichas={fichas}
          updateTextButton={updateTextButton}
          setUnidad={setFichas}
          getAllFichas={getAllFichas}
        />
      ) : null}
      <hr />

      {/* {modalDialog ? (
        <ModalDialog
          getUnidad={getUnidad}
          deleteUnidad={deleteUnidad}
          onDoubleClickUnidad={onDoubleClickUnidad}
          setModalDialog={setModalDialog}
          setStateAddUnidad={setStateAddUnidad}
          setUnidad={setUnidad}
        />
      ) : null} */}
      <Outlet />
    </>
  );
};

export default CrudFichas;
