import { useEffect, useState } from "react";
import clieteAxios from "../config/axios";

const FormQueryProgramaFormacion = ({ buttonForm, setProgramaQuery }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const sendFormQuery = async (query) => {
    if (query) {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      let URI = `/programa/nombre/${query}`;
      try {
        const respuesta = await clieteAxios(URI, config);
        if ( respuesta.status == 200 ) {
            setProgramaQuery(respuesta.data)
        } else {
          console.log("Error: " + respuesta.status);
        }
      } catch (error) {
        console.error(error);
        setProgramaQuery([]);
      }
    } else {
        setProgramaQuery([]);
    }
  };

  useEffect(() => {
    setProgramaQuery([]);

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
export default FormQueryProgramaFormacion;