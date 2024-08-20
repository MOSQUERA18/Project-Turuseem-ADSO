import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";

import FormTurnosEspeciales from "./FormTurnosEspeciales.jsx";
import FormQueryTurnosEspeciales from "./FormQueryTurnosEspeciales.jsx";
import Pagination from "../pagination.jsx";
import Alerta from "../components/Alerta.jsx";

import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { Outlet } from "react-router-dom";

const URI = "/turnoespecial";

const CrudTurnosEspeciales = () => {
  const [turnoEspecialList, setTurnoEspecialList] = useState([]);
  const [turnoEspecialQuery, setTurnoEspecialQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddturnoEspecial, setStateAddturnoEspecial] = useState(false);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(0);
  const [alerta, setAlerta] = useState({});

  const [turnoEspecial, setturnoEspecial] = useState({
    Id_TurnoEspecial: "",
    Fec_TurnoEspecial: "",
    Hor_Inicio: "",
    Hor_Fin: "",
    Obs_TurnoEspecial: "",
    Tot_AprendicesAsistieron: "",
    Id_Ficha: "",
    Img_Asistencia: "",
    Id_Funcionario: "",
    Id_Unidad: "",
  });

  useEffect(() => {
    getAllTurnoEspeciales();
  }, []);

  const getAllTurnoEspeciales = async () => {
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
        setTurnoEspecialList(respuestApi.data);
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

  const getturnoEspecial = async (Id_turnoEspecial) => {
    setButtonForm("Actualizar");
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios(`${URI}/${Id_turnoEspecial}`, config);
      if (respuestApi.status === 200) {
        setturnoEspecial({
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

  const deleteturnoEspecial = (Id_turnoEspecial) => {
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
            `/${URI}/${Id_turnoEspecial}`,
            config
          );
          if (respuestApi.status === 200) {
            getAllTurnoEspeciales(); // Refrescar la lista después de borrar
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
            setStateAddturnoEspecial(!stateAddturnoEspecial);
          }}
        >
          {stateAddturnoEspecial ? (
            <AiOutlineMinusCircle size={16} className="me-2" />
          ) : (
            <IoMdPersonAdd size={16} className="me-2" />
          )}
          {stateAddturnoEspecial ? "Ocultar" : "Agregar"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-lg text-gray-700">
              Buscar Por Nombre...
            </h1>
            <FormQueryTurnosEspeciales
              getturnoEspecial={getturnoEspecial}
              deleteturnoEspecial={deleteturnoEspecial}
              buttonForm={buttonForm}
              turnoEspecialQuery={turnoEspecialQuery}
              setTurnoEspecialQuery={setTurnoEspecialQuery}
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
            {(turnoEspecialQuery.length ? turnoEspecialQuery : turnoEspecialList).map(
              (turnoEspecial, indice) =>
                indice >= desde && indice < hasta ? (
                  <tr
                    key={turnoEspecial.Id_turnoEspecial}
                    className="odd:bg-white even:bg-gray-100 select-none"
                  >
                    <td className="py-2 px-4 border-b">{turnoEspecial.Id_turnoEspecial}</td>
                    <td className="py-2 px-4 border-b">{turnoEspecial.Nom_turnoEspecial}</td>
                    <td className="py-2 px-4 border-b">
                      {turnoEspecial.Hor_Apertura}
                    </td>
                    <td className="py-2 px-4 border-b">{turnoEspecial.Hor_Cierre}</td>
                    <td className="py-2 px-4 border-b">{turnoEspecial.Estado}</td>
                    <td className="py-2 px-4 border-b">
                      {turnoEspecial.areas.Nom_Area}{" "}
                      {/* Puedes reemplazar esto por el nombre del área si lo tienes disponible */}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => [
                          getturnoEspecial(turnoEspecial.Id_turnoEspecial),
                          setStateAddturnoEspecial(true),
                        ]}
                        className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => deleteturnoEspecial(turnoEspecial.Id_turnoEspecial)}
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
      {stateAddturnoEspecial ? (
        <FormTurnosEspeciales
          buttonForm={buttonForm}
          turnoEspecial={turnoEspecial}
          updateTextButton={updateTextButton}
          setturnoEspecial={setturnoEspecial}
          getAllturnoEspeciales={getAllTurnoEspeciales}
        />
      ) : null}
      <hr />
      <Outlet />
    </>
  );
};

export default CrudTurnosEspeciales;
