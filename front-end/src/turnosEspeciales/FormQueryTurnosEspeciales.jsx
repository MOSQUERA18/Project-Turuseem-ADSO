/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// import axios from "axios";
import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import { ReactSession } from 'react-client-session';

const FormQueryTurnosEspeciales = ({ buttonForm, setTurnoEspecialQuery }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const sendFormQuery = async (query) => {
    if (query) {
      const token = ReactSession.get("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      let URI = `/turnoespecial/query/${query}`;
      try {
        const respuesta = await clienteAxios(URI, config);
        if ( respuesta.status == 200 ) {
            setTurnoEspecialQuery(respuesta.data)
        } else {
          console.log("Error: " + respuesta.status);
        }
      } catch (error) {
        console.error(error);
        setTurnoEspecialQuery([]);
      }
    } else {
        setTurnoEspecialQuery([]);
    }
  };

  useEffect(() => {
    setTurnoEspecialQuery([]);

    setSearchQuery("");
  }, [buttonForm]);

  return (
    <>
      <div className="flex content-center w-96">
        <form
          action=""
          id="queryForm"
          className="bg-white  rounded-2xl max-w-3xl w-full"
        >
          <div className="mb-4">
            <input
              type="text"
              id="documentQuery"
              placeholder="Buscar Aprendices..."
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={searchQuery}
              onChange={(e) => {
                const { value } = e.target;
                setSearchQuery(value);
                sendFormQuery(value);
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
};
export default FormQueryTurnosEspeciales;