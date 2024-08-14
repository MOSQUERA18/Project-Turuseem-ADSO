import clieteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import FormPrograFormacion from "./formProgramaFormacion.jsx";
import FormQueryProgramaFormacion from "./formQueryProgramaFormacion.jsx";
// import ModalDialog from "./modalDialog.jsx";
import Pagination from "../pagination.jsx";
// import ImportarCSV from "./importarCSV.jsx";
import Alerta from "../components/Alerta.jsx";

import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { Outlet } from "react-router-dom";

const URI = "programa";

const CrudPrograma = () => {
  const [programaList, setProgramaList] = useState([]);
  const [programaQuery, setProgramaQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddPrograma, setStateAddPrograma] = useState(false);
  
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(0);
  const [alerta, setAlerta] = useState({});

  const [programa, setPrograma] = useState({
    
    Nom_ProgramaFormacion: "",
    Tip_ProgramaFormacion: "",
    Id_Area: "",
  });

  useEffect(() => {
    getAllPrograma();
    
  }, []);

  const getAllPrograma = async () => {
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
        setProgramaList(respuestApi.data);
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

  const getPrograma = async (Id_ProgramaFormacion) => {
    setButtonForm("Actualizar");
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clieteAxios(`${URI}/${Id_Unidad}`, config);
      if (respuestApi.status === 200) {
        setPrograma({
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
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const respuestApi = await clieteAxios.delete(
            `/${URI}/${Id_Unidad}`,
            config
          );
          if (respuestApi.status === 200) {
            getAllPrograma();  // Refrescar la lista después de borrar
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
            setStateAddPrograma(!stateAddPrograma);
          }}
        >
          {stateAddPrograma ? (
            <AiOutlineMinusCircle size={16} className="me-2" />
          ) : (
            <IoMdPersonAdd size={16} className="me-2" />
          )}
          {stateAddPrograma ? "Ocultar" : "Agregar"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-lg text-gray-700">
              Buscar Por Programa...
            </h1>
            <FormQueryProgramaFormacion
              getPrograma={getPrograma}
              deletePrograma={deletePrograma}
              buttonForm={buttonForm}
              programaQuery={programaQuery}
              setProgramaQuery={setProgramaQuery}
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
              <th className="py-2 px-4 border-2 border-b-gray-500">ID</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Nombre</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Tipo</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Área</th>
            </tr>
          </thead>
          <tbody>
            {(programaQuery.length ? programaQuery : programaList).map(
              (programa, indice) =>
                indice >= desde && indice < hasta ? (
                  <tr
                    key={programa.Id_ProgramaFormacion}
                    className="odd:bg-white even:bg-gray-100 select-none"
                    // onDoubleClick={() => [
                    //   // setOnDoubleClickUnidad(unidad),
                    //   setModalDialog(true),
                    // ]}
                  >
                    <td className="py-2 px-4 border-b">
                      {programa.Id_ProgramaFormacion}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {programa.Tip_ProgramaFormacion}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {programa.areas.Nom_Area} {/* Puedes reemplazar esto por el nombre del área si lo tienes disponible */}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => [
                          getPrograma(programa.Id_ProgramaFormacion),
                          setStateAddPrograma(true),
                        ]}
                        className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => deletePrograma(programa.Id_ProgramaFormacion)}
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
      {stateAddPrograma ? (
        <FormPrograFormacion
          buttonForm={buttonForm}
          programa={programa}
          updateTextButton={updateTextButton}
          setPrograma={setPrograma}
          getAllPrograma={getAllPrograma}
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

export default CrudPrograma;