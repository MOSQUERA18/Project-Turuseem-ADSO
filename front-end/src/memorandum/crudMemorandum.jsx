import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from 'react-client-session';
import FormMemorandum from "./formMemorandum.jsx";
import FormQueryMemorandum from "./formQueryMemorandum.jsx";
import Pagination from "../pagination.jsx";
import clienteAxios from "../config/axios.jsx";
import { useNavigate } from "react-router-dom";

// Icons
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { BsSendArrowUp } from "react-icons/bs";
import { MdOutlinePreview } from "react-icons/md";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { TiDocumentAdd } from "react-icons/ti";

const URI = "http://localhost:8000/memorando/";

const CrudMemorandum = () => {
  const [memorandumList, setMemorandumList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddMemorandum, setStateAddMemorandum] = useState(false);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(0);
  const navigate = useNavigate();

  const [memorandum, setMemorandum] = useState({
    Id_Memorando: "",
    Fec_Memorando: "",
    Mot_Memorando: "",
    Id_Inasistencia: "",
  });

  useEffect(() => {
    getAllMemorandum();
  }, []);

  const getAllMemorandum = async () => {
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios("/memorando/", config);
      if (respuestApi.status == 200) {
        setMemorandumList(respuestApi.data);
      } else {
        console.log("Error: " + respuestApi.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getMemorandum = async (Id_Memorando) => {
    setButtonForm("Actualizar");
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios(`/memorando/${Id_Memorando}`, config);
      if (respuestApi.status === 200) {
        setMemorandum({
          ...respuestApi.data,
        });
      } else {
        console.log("Error" + respuestApi.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateTextButton = (text) => {
    setButtonForm(text);
  };

  const deleteMemorandum = (Id_Memorando) => {
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
            `/memorando/${Id_Memorando}`,
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
          console.error(error);
        }
      }
    });
  };
  const mostrarPdf = () => {
    navigate("/admin/PdfView");
  };

  return (
    <>
      <div className="flex justify-end pb-3">
        <button
          className="bg-green-600 px-6 py-2 rounded-xl text-white font-bold m-4 flex items-center hover:bg-green-800"
          onClick={() => {
            setStateAddMemorandum(!stateAddMemorandum);
          }}
        >
          {stateAddMemorandum ? (
            <AiOutlineMinusCircle size={16} className="me-2" />
          ) : (
            <TiDocumentAdd size={16} className="me-2" />
          )}
          {stateAddMemorandum ? "Ocultar" : "Agregar"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <div>
          <h1 className="font-semibold text-lg text-gray-700">
            Buscar Por Codigo o Fecha...
          </h1>
          <FormQueryMemorandum
            getMemorandum={getMemorandum}
            deleteMemorandum={deleteMemorandum}
            buttonForm={buttonForm}
          />
        </div>
        <table className="min-w-full bg-white text-center text-sm">
          <thead className="text-white bg-green-700">
            <tr>
              <th className="py-2 px-4 border-2 border-b-gray-500">
                Codigo Memorando
              </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">
                Fecha Memorando
              </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">
                Motivo Memorando
              </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">
                Inasistencia
              </th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {memorandumList.map((memorandum, indice) =>
              indice >= desde && indice < hasta ? (
                <tr
                  key={memorandum.Id_Memorando}
                  className="odd:bg-white even:bg-gray-100"
                >
                  <td className="py-2 px-4 border-b">
                    {memorandum.Id_Memorando}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {memorandum.Fec_Memorando}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {memorandum.Mot_Memorando}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {memorandum.Id_Inasistencia}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => getMemorandum(memorandum.Id_Memorando)}
                      className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={() => deleteMemorandum(memorandum.Id_Memorando)}
                      className="text-red-500 hover:text-red-700 hover:border hover:border-red-500 p-1 rounded "
                    >
                      <MdDeleteForever />
                    </button>
                    <button className="text-indigo-500 hover:text-indigo-700 hover:border hover:border-indigo-500 p-1 rounded">
                      <BsSendArrowUp />
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-700 hover:border hover:border-gray-500 p-1 rounded mx-2"
                      onClick={mostrarPdf}
                    >
                      <MdOutlinePreview />
                      Ver
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
      {stateAddMemorandum ? (
        <FormMemorandum
          buttonForm={buttonForm}
          memorandum={memorandum}
          updateTextButton={updateTextButton}
        />
      ) : null}
      <hr />
    </>
  );
};
export default CrudMemorandum;
