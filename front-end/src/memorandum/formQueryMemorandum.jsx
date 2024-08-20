/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { BsSendArrowUp } from "react-icons/bs";
import { MdOutlinePreview } from "react-icons/md";
import clienteAxios from "../config/axios";
import { ReactSession } from 'react-client-session';

// eslint-disable-next-line react/prop-types
const FormQueryMemorandum = ({
  getMemorandum,
  deleteMemorandum,
  buttonForm,
}) => {
  const [memorandumQuery, setMemorandumQuery] = useState([]);
  const [Id_Memorando, setId_Memorando] = useState("");

  const sendFormQuery = async (Id_Memorando) => {
    if (Id_Memorando) {
      const token = ReactSession.get("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      };
      try {
        const respuestApi = await clienteAxios(`/memorando/codigo/${Id_Memorando}`, config);
        if (respuestApi.status === 200) {
          setMemorandumQuery(respuestApi.data);
        } else {
          console.log("Error" + respuestApi.status);
        }
      } catch (error) {
        console.error("Error al consultar memorando:", error);
      }
    } else {
      setMemorandumQuery([]);
    }
  };

  useEffect(() => {
    setMemorandumQuery([]);
    setId_Memorando("");
  }, [buttonForm]);

  return (
    <>
      <div className="flex content-center w-96">
        <form
          action=""
          id="queryForm"
          className="bg-white rounded-2xl max-w-3xl w-full"
        >
          <div className="mb-4">
            <input
              type="number"
              id="codeQuery"
              placeholder="Buscar Memorandos..."
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={Id_Memorando}
              onChange={(e) => {
                sendFormQuery(e.target.value);
                setId_Memorando(e.target.value);
              }}
            />
          </div>
        </form>
      </div>
      <div className="overflow-x-auto">
        {memorandumQuery.length > 0 ? (
          <table className="min-w-full bg-white text-center text-sm">
            <thead className="text-white bg-green-700">
              <tr>
                <th className="py-2 px-4 border-2 border-b-gray-500">
                  Cod Memorando
                </th>
                <th className="py-2 px-4 border-2 border-b-gray-500">
                  Fec Memorando
                </th>
                <th className="py-2 px-4 border-2 border-b-gray-500">
                  Mot_Memorando
                </th>
                <th className="py-2 px-4 border-2 border-b-gray-500">
                  Inasistencia
                </th>
                <th className="py-2 px-4 border-2 border-b-gray-500">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {memorandumQuery.map((memorandum) => (
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
                      className="text-red-500 hover:text-red-700 hover:border hover:border-red-500 p-1 rounded"
                    >
                      <MdDeleteOutline />
                    </button>
                    <button className="text-indigo-500 hover:text-indigo-700 hover:border hover:border-indigo-500 p-1 rounded">
                      <BsSendArrowUp />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 hover:border hover:border-gray-500 p-1 rounded mx-2">
                      <MdOutlinePreview />
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default FormQueryMemorandum;
