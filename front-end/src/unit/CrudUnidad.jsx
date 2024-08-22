import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";
// import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";
// import $ from "jquery";
// import "datatables.net";
// import "datatables.net-dt/css/dataTables.dataTables.min.css";

import FormUnidades from "./formUnidades.jsx";
import Alerta from "../components/Alerta.jsx";
import DataTableUnit from "./dataTableUnit.jsx";

import { IoMdPersonAdd } from "react-icons/io";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { Outlet } from "react-router-dom";

const URI = "unidades";

const CrudUnidades = () => {
  const [unidadList, setUnidadList] = useState([]);
  // const [unidadQuery, setUnidadQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddUnidad, setStateAddUnidad] = useState(false);
  // const [desde, setDesde] = useState(0);
  // const [hasta, setHasta] = useState(0);
  const [alerta, setAlerta] = useState({});

  const [unidad, setUnidad] = useState({
    Nom_Unidad: "",
    Hor_Apertura: "",
    Hor_Cierre: "",
    Estado: "",
    Id_Area: "",
  });

  useEffect(() => {
    getAllUnidades();
  }, []);

  const getAllUnidades = async () => {
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
        setUnidadList(respuestApi.data);
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


  const getUnidad = async (Id_Unidad) => {
    setButtonForm("Actualizar");
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios(`${URI}/${Id_Unidad}`, config);
      if (respuestApi.status === 200) {
        setUnidad({
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

  const deleteUnidad = (Id_Unidad) => {
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
            `/${URI}/${Id_Unidad}`,
            config
          );
          if (respuestApi.status === 200) {
            getAllUnidades(); // Refrescar la lista después de borrar
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
        Unidades
      </h1>
      {/* <DataTableUnit unidadList={unidadList} getUnidad={getUnidad} setStateAddUnidad={setStateAddUnidad} deleteUnidad={deleteUnidad}/> */}
      <div className="flex justify-end pb-3">
        <button
          className="bg-green-600 px-6 py-2 rounded-xl text-white font-bold m-4 flex items-center hover:bg-green-800"
          onClick={() => {
            setStateAddUnidad(!stateAddUnidad);
          }}
        >
          {stateAddUnidad ? (
            <AiOutlineMinusCircle size={16} className="me-2" />
          ) : (
            <IoMdPersonAdd size={16} className="me-2" />
          )}
          {stateAddUnidad ? "Ocultar" : "Agregar"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex justify-between">
          <div>
            {/* <h1 className="font-semibold text-lg text-gray-700">
              Buscar Por Nombre...
            </h1> */}
            {/* <FormQueryUnidades
              getUnidad={getUnidad}
              deleteUnidad={deleteUnidad}
              buttonForm={buttonForm}
              unidadQuery={unidadQuery}
              setUnidadQuery={setUnidadQuery}
            /> */}
          </div>
        </div>
        <hr />
        {msg && <Alerta alerta={alerta} />}
        <DataTableUnit unidadList={unidadList} getUnidad={getUnidad} deleteUnidad={deleteUnidad} setStateAddUnidad={setStateAddUnidad}/>
        {/* <table
          className="min-w-full bg-white text-center text-sm"
          id="tablaUnidad"
        >
          <thead className="text-white bg-green-700">
            <tr className="">
              <th className="py-2 px-4 border-2 border-b-gray-500">ID</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Nombre</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">
                Hora Apertura
              </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">
                Hora Cierre
              </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Estado</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Área</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {unidadList.map((unidad) => (
              <tr
                key={unidad.Id_Unidad}
                className="odd:bg-white even:bg-gray-100 select-none"
              >
                <td className="py-2 px-4 border-b">{unidad.Id_Unidad}</td>
                <td className="py-2 px-4 border-b">{unidad.Nom_Unidad}</td>
                <td className="py-2 px-4 border-b">{unidad.Hor_Apertura}</td>
                <td className="py-2 px-4 border-b">{unidad.Hor_Cierre}</td>
                <td className="py-2 px-4 border-b">{unidad.Estado}</td>
                <td className="py-2 px-4 border-b">
                  {unidad.areas.Nom_Area}{" "}
                  Puedes reemplazar esto por el nombre del área si lo tienes disponible
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => [
                      getUnidad(unidad.Id_Unidad),
                      setStateAddUnidad(true),
                    ]}
                    className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => deleteUnidad(unidad.Id_Unidad)}
                    className="text-red-500 hover:text-red-700 hover:border hover:border-red-500 p-1 rounded"
                  >
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
      {/* <Pagination URI={URI} setDesde={setDesde} setHasta={setHasta} /> */}
      <hr />
      {stateAddUnidad ? (
        <FormUnidades
          buttonForm={buttonForm}
          unidad={unidad}
          updateTextButton={updateTextButton}
          setUnidad={setUnidad}
          getAllUnidades={getAllUnidades}
        />
      ) : null}
      <hr />
      <Outlet />
    </>
  );
};

export default CrudUnidades;
