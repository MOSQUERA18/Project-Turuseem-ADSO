import clieteAxios from "../config/axios.jsx";
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

  const [turnoEspecial, setTurnoEspecial] = useState({
    // Id_TurnoEspecial: "",
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
    getAllTurnosEspeciales();
  }, []);

  const getAllTurnosEspeciales = async () => {
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
        setTurnoEspecialList(respuestApi.data);
      } else {
        setAlerta({
          msg: `Error al cargar los registros!`,
          error: true,
        });
      }

      
    } catch (error) {
      setAlerta({
        msg: `Ocurrio un error!`,
        error: true,
      });
      console.error(error);
    }
  };
  const getTurnoEspecial = async (Id_turnoEspecial) => {
    setButtonForm("Actualizar");
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clieteAxios(
        `${URI}/${Id_turnoEspecial}`,
        config
      );
      if (respuestApi.status === 200) {
        setTurnoEspecial({
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

  const deleteTurnoEspecial = (Id_turnoEspecial) => {
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
            `/${URI}/${Id_turnoEspecial}`,
            config
          );
          if (respuestApi.status === 200) {
            getAllTurnosEspeciales(); // Refrescar la lista después de borrar
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
        Turnos Especiales
      </h1>
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
              getTurnoEspecial={getTurnoEspecial}
              deleteTurnoEspecial={deleteTurnoEspecial}
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
              {/* <th className="py-2 px-4 border-2 border-b-gray-500">ID</th> */}
              <th className="py-2 px-4 border-2 border-b-gray-500">
                Fecha Turno
              </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">
                Hora Inicio
              </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">
                Hora Fin
              </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">
                Observaciones
              </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">
                Total Aprendices
              </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">
                Ficha
              </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">
                Imagen Asistencia
              </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">
                Funcionario
              </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">
                Unidad
              </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(turnoEspecialQuery.length
              ? turnoEspecialQuery
              : turnoEspecialList
            ).map((turnoEspecial, indice) =>
              indice >= desde && indice < hasta ? (
                <tr
                  key={turnoEspecial.Id_TurnoEspecial}
                  className="odd:bg-white even:bg-gray-100 select-none"
                >
                  {/* <td className="py-2 px-4 border-b">
                    {turnoEspecial.Id_TurnoEspecial}
                  </td> */}
                  <td className="py-2 px-4 border-b">
                    {turnoEspecial.Fec_TurnoEspecial}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {turnoEspecial.Hor_Inicio}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {turnoEspecial.Hor_Fin}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {turnoEspecial.Obs_TurnoEspecial}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {turnoEspecial.Tot_AprendicesAsistieron}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {turnoEspecial.Id_Ficha}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {turnoEspecial.Img_Asistencia}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {turnoEspecial.funcionario.Nom_Funcionario}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {turnoEspecial.unidad.Nom_Unidad}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => [
                        getTurnoEspecial(turnoEspecial.Id_TurnoEspecial),
                        setStateAddturnoEspecial(true),
                      ]}
                      className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={() =>
                        deleteTurnoEspecial(turnoEspecial.Id_turnoEspecial)
                      }
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
          // setTurnoEspecial={setTurnoEspecial}
          getAllTurnosEspeciales={getAllTurnosEspeciales}
        />
      ) : null}
      <hr />
      <Outlet />
    </>
  );
};

export default CrudTurnosEspeciales;