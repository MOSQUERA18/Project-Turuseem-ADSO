import clieteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import FormTalentoHumano from "./formTalentoHumano.jsx";
import FormQueryTalentoHumano from "./formQueryTalentoHumano.jsx";
// import ModalDialog from "./modalDialog.jsx";
import Pagination from "../pagination.jsx";
// import ImportarCSV from "./importarCSV.jsx";
import Alerta from "../components/Alerta.jsx";

import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { Outlet } from "react-router-dom";

const URI = "talentoHumano";

const CrudTalentoHumano = () => {
  const [talentoHumanoList, setTalentoHumanoList] = useState([]);
  const [talentoHumanoQuery, setTalentoHumanoQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddTalentoHumano, setStateAddTalentoHumano] = useState(false);
  // const [onDoubleClickUnidad, setOnDoubleClickUnidad] = useState({});
  // const [modalDialog, setModalDialog] = useState(false);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(0);
  const [alerta, setAlerta] = useState({});

  const [talentoHumano, setTalentoHumano] = useState({
    Id_TalentoHumano: "",
    Nom_TalentoHumano: "",
    Ape_TalentoHumano: "",
    Gen_TalentoHumano: "",
    Cor_TalentoHumano: "",
    Tel_TalentoHumano: "",
    Id_Ficha: "",
    Est_TalentoHumano: "",
  });

  useEffect(() => {
    getAllTalentoHumano();
    
  }, []);

  const getAllTalentoHumano = async () => {
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
        setTalentoHumanoList(respuestApi.data);
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

  const getTalentoHumano = async (Id_TalentoHumano) => {
    setButtonForm("Actualizar");
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clieteAxios(`${URI}/${Id_TalentoHumano}`, config);
      if (respuestApi.status === 200) {
        setTalentoHumano({
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

  const deleteTalentoHumano = (Id_TalentoHumano) => {
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
            `/${URI}/${Id_TalentoHumano}`,
            config
          );
          if (respuestApi.status === 200) {
            getAllTalentoHumano();  // Refrescar la lista después de borrar
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
            setStateAddTalentoHumano(!stateAddTalentoHumano);
          }}
        >
          {stateAddTalentoHumano ? (
            <AiOutlineMinusCircle size={16} className="me-2" />
          ) : (
            <IoMdPersonAdd size={16} className="me-2" />
          )}
          {stateAddTalentoHumano ? "Ocultar" : "Agregar"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-lg text-gray-700">
              Buscar Por Nombre...
            </h1>
            <FormQueryTalentoHumano
              getTalentoHumano={getTalentoHumano}
              deleteTalentoHumano={deleteTalentoHumano}
              buttonForm={buttonForm}
              talentoHumanoQuery={talentoHumanoQuery}
              setTalentoHumanoQuery={setTalentoHumanoQuery}
            />
          </div>
        </div>
        <hr />
        {msg && <Alerta alerta={alerta} />}
        <table className="min-w-full bg-white text-center text-sm">
          <thead className="text-white bg-green-700">
            <tr className="">
              <th className="py-2 px-4 border-2 border-b-gray-500">Documento</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Nombre</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Apellido</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Genero</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Correo</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Telefono</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Ficha</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Estado</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(talentoHumanoQuery.length ? talentoHumanoQuery : talentoHumanoList).map(
              (talentoHumano, indice) =>
                indice >= desde && indice < hasta ? (
                  <tr
                    key={talentoHumano.Id_talentoHumano}
                    className="odd:bg-white even:bg-gray-100 select-none"
                    // onDoubleClick={() => [
                    //   // setOnDoubleClickUnidad(unidad),
                    //   setModalDialog(true),
                    // ]}
                  >
                    <td className="py-2 px-4 border-b">
                      {talentoHumano.Id_TalentoHumano}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {talentoHumano.Nom_TalentoHumano}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {talentoHumano.Ape_TalentoHumano}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {talentoHumano.Gen_TalentoHumano}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {talentoHumano.Tel_TalentoHumano}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {talentoHumano.Id_Ficha}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {talentoHumano.Est_TalentoHumano}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => [
                          getTalentoHumano(talentoHumano.Id_TalentoHumano),
                          setStateAddTalentoHumano(true),
                        ]}
                        className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => deleteTalentoHumano(talentoHumano.Id_TalentoHumano)}
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
      {stateAddTalentoHumano? (
        <FormTalentoHumano
          buttonForm={buttonForm}
          talentoHumano={talentoHumano}
          updateTextButton={updateTextButton}
          setTalentoHumano={setTalentoHumano}
          getAllTalentoHumano={getAllTalentoHumano}
        />
      ) : null}
      <hr />

      <Outlet />
    </>
  );
};

export default CrudTalentoHumano;
