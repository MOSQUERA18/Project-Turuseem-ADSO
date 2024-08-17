import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clieteAxios from "../config/axios";

const FormProgramaFormacion = ({ buttonForm, programa, updateTextButton, getAllPrograma }) => {
  const [Nom_ProgramaFormacion, setNom_ProgramaFormacion] = useState("");
  const [Tip_ProgramaFormacion, setTip_ProgramaFormacion] = useState("");
  const [Id_Area, setId_Area] = useState("");  
  const [selectedArea, setSelectedArea] = useState(null);
  const [Areas, setAreas] = useState([]);  

  // Estado para mensajes
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' o 'error'

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await clieteAxios.get('/areas', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if(response.status ==200){
          setAreas(response.data);
        }
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchAreas();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const sendForm = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      let respuestApi;
      if (buttonForm === "Actualizar") {
        respuestApi = await clieteAxios.put(
          `/programa/${programa.Id_Programa}`,
          {
            Nom_Unidad,
            Hor_Apertura,
            Hor_Cierre,
            Estado,
            Id_Area,
          },
          config
        );
      } else if (buttonForm === "Enviar") {
        respuestApi = await clieteAxios.post(
          `/programa`,
          {
            Nom_ProgramaFormacion,
            Tip_ProgramaFormacion,
            Id_Area,
          },
          config
        );
      }

      if (respuestApi.status === 201 || respuestApi.status === 200) {
        setMessage("Programa registrado correctamente!");
        setMessageType("success");
        clearForm();
        getAllPrograma();
        updateTextButton("Enviar");
      } else {
        setMessage(respuestApi.data.message || "Error al registrar el programa.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error al registrar el programa.");
      setMessageType("error");
    }
  };

  const clearForm = () => {
    setNom_ProgramaFormacion("");
    Tip_ProgramaFormacion("");
    setId_Area("");
    setSelectedArea(null);
  };

  const setData = () => {
    setNom_ProgramaFormacion(programa.Nom_ProgramaFormacion);
    Tip_ProgramaFormacion(programa.Tip_ProgramaFormacion);
    setId_Area(unidad.Id_Area);
    const selected = Areas.find(area => area.Id_Area === unidad.Id_Area);
    setSelectedArea(selected || null);
  };

  useEffect(() => {
    setData();
  }, [unidad]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 content-center w-full">
        <form
          id="apprenticeForm"
          onSubmit={sendForm}
          className="bg-white shadow-2xl rounded-2xl px-14 pt-6 pb-8 mb-4 max-w-3xl w-full mt-10"
        >
          <h1 className="font-bold text-green-600 text-3xl uppercase text-center my-5">
            Registrar Unidades
          </h1>

          {message && (
            <div className={`p-4 mb-4 text-white rounded-md ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
              {message}
            </div>
          )}

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Nombre Unidad
            </label>
            <input
              type="text"
              id="nombre"
              placeholder="Nombre"
              value={Nom_Unidad}
              onChange={(e) => setNom_Unidad(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex items-center mb-3 space-x-4">
            <div className="w-1/2">
              <label className="text-gray-700 uppercase font-bold">
                Hora Apertura:
              </label>
              <input
                type="time"
                id="hora_apertura"
                value={Hor_Apertura}
                onChange={(e) => setHor_Apertura(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="w-1/2">
              <label className="text-gray-700 uppercase font-bold">
                Hora Cierre:
              </label>
              <input
                type="time"
                id="hora_cierre"
                value={Hor_Cierre}
                onChange={(e) => setHor_Cierre(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Estado:
            </label>
            <select
              id="estado"
              value={Estado}
              onChange={(e) => setEstado(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            >
              <option value="">Seleccione un Estado:</option>
              <option value="Activo">Activa</option>
              <option value="Inactivo">Inactiva</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Área Perteneciente: 
            </label>
            <select
              id="id_area"
              value={Id_Area}
              onChange={(e) => setId_Area(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            >
              <option value="">Seleccione un Área:</option>
              {Areas.map((area) => (
                <option key={area.Id_Area} value={area.Id_Area}>
                  {area.Nom_Area}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-around">
            <input
              type="submit"
              id="button"
              value={buttonForm}
              className="bg-green-600 w-full py-3 px-8 rounded-xl text-white mt-2 uppercase font-bold hover:cursor-pointer hover:bg-green-700 md:w-auto"
            />
            <input
              type="button"
              id="button"
              value="Limpiar"
              onClick={() => {
                clearForm();
              }}
              className="bg-yellow-400 w-full py-3 px-8 rounded-xl text-white mt-2 uppercase font-bold hover:cursor-pointer hover:bg-yellow-500 md:w-auto"
              aria-label="Limpiar"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default FormProgramaFormacion;