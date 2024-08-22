/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { ReactSession } from 'react-client-session';
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const FormFichas = ({ buttonForm, fichas, updateTextButton, getAllFichas }) => {
  const [Id_Ficha, setId_Ficha] = useState("");
  const [Fec_InicioEtapaLectiva,setFec_InicioEtapaLectiva] = useState("");
  const [Fec_FinEtapaLectiva,setFec_FinEtapaLectiva] = useState("");
  const [Can_Aprendices,setCan_Aprendices] = useState("")
  const [Id_ProgramaFormacion, setId_ProgramaFormacion] = useState(""); // Cambiado a un valor único
  const [Estado, setEstado] = useState("");
  const [selectedPrograma,setSelectedPrograma] = useState(null);
  const [programasformacion, setProgramasFormacion] = useState([]); 
  const [alerta, setAlerta] = useState({});


  // Estado para mensajes
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' o 'error'

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const token = ReactSession.get("token");
        const response = await clienteAxios.get('/programa', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          console.log('Programas de formación:', response.data); // Imprime los datos para verificar
          setProgramasFormacion(response.data);
        }
      } catch (error) {
        console.error('Error fetching Programas:', error);
      }
    };
  
    fetchProgramas();
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
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      let respuestApi;
      if (buttonForm === "Actualizar") {
        respuestApi = await clienteAxios.put(
          `/fichas/${fichas.Id_Ficha}`,
          {
            Id_Ficha,
            Fec_InicioEtapaLectiva,
            Fec_FinEtapaLectiva,
            Can_Aprendices,
            Id_ProgramaFormacion,
            Estado

          },
          config
        );
      } else if (buttonForm === "Enviar") {
        respuestApi = await clienteAxios.post(
          `/fichas`,
          {
            Id_Ficha,
            Fec_InicioEtapaLectiva,
            Fec_FinEtapaLectiva,
            Can_Aprendices,
            Id_ProgramaFormacion,
            Estado
          },
          config
        );
      }

      if (respuestApi.status === 201 || respuestApi.status === 200) {
        setMessage("Ficha registrada correctamente!");
        setMessageType("success");
        clearForm();
        getAllFichas();
        updateTextButton("Enviar");
      } else {
        setMessage(respuestApi.data.message || "Error al registrar la Ficha.");
        setMessageType("error");
      }
    } catch (error) {
      setAlerta({
        msg: "Todos los campos son obligatorios!",
        error: true,
      });
      // setMessage("Error al registrar la Ficha, Por Campos Faltantes.");
      setMessageType("error");
    }
  };

  const clearForm = () => {
    setId_Ficha(""),
    setFec_InicioEtapaLectiva(""),
    setFec_FinEtapaLectiva(""),
    setCan_Aprendices(""),
    setId_ProgramaFormacion(""),
    setEstado("")
    setSelectedPrograma(null);
    
  };

  const setData = () => {
    setId_Ficha(fichas.Id_Ficha);
    setFec_InicioEtapaLectiva(fichas.Fec_InicioEtapaLectiva);
    setFec_FinEtapaLectiva(fichas.Fec_FinEtapaLectiva);
    setCan_Aprendices(fichas.Can_Aprendices);
    setId_ProgramaFormacion(fichas.Id_ProgramaFormacion || '');
    setEstado(fichas.Estado);
    const selected = programasformacion.find(programa => programa.Id_ProgramaFormacion === fichas.Id_ProgramaFormacion);
    setSelectedPrograma(selected || null);
    
  };

  useEffect(() => {
    setData();
  }, [fichas]);
  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 content-center w-full">
        <form
          id="apprenticeForm"
          onSubmit={sendForm}
          className="bg-white shadow-2xl rounded-2xl px-14 pt-6 pb-8 mb-4 max-w-3xl w-full mt-10"
        >
          {msg && <Alerta alerta={alerta} />}
          <h1 className="font-bold text-green-600 text-3xl uppercase text-center my-5">
            Registro De Fichas
          </h1>

          {message && (
            <div className={`p-4 mb-4 text-white rounded-md ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
              {message}
            </div>
          )}

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Numero de Ficha :
            </label>
            <input
              type="number"
              id="Id_Ficha"
              placeholder="Numero"
              value={Id_Ficha}
              onChange={(e) => setId_Ficha(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex items-center mb-3 space-x-4">
            <div className="w-1/2">
              <label className="text-gray-700 uppercase font-bold">
                Fecha Inicio Etapa Lectiva:
              </label>
              <input
                type="date"
                id="fec_inicioetapalectiva"
                value={Fec_InicioEtapaLectiva}
                onChange={(e) => setFec_InicioEtapaLectiva(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="w-1/2">
              <label className="text-gray-700 uppercase font-bold">
              Fecha Fin Etapa Lectiva:
              </label>
              <input
                type="date"
                id="fec_finetapalectiva"
                value={Fec_FinEtapaLectiva}
                onChange={(e) => setFec_FinEtapaLectiva(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="mb-3">
          <div className="w-1/2">
              <label className="text-gray-700 uppercase font-bold">
              Cantidad de Aprendices:
              </label>
              <input
                type="number"
                id="can_aprendices"
                value={Can_Aprendices}
                onChange={(e) => setCan_Aprendices(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>



          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Nombre del Programa de Formacion
            </label>
            <select
              id="Id_ProgramaFormacion"
              value={Id_ProgramaFormacion}
              onChange={(e) => setId_ProgramaFormacion(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            >
              <option value="">Seleccione un Nombre de Programa:</option>
              {programasformacion.map((programasFormacion) => (
                <option key={programasFormacion.Id_ProgramaFormacion} value={programasFormacion.Id_ProgramaFormacion}>
                  {programasFormacion.Nom_ProgramaFormacion}
                </option>
              ))}
            </select>
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
                updateTextButton("Enviar")
                
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

export default FormFichas;
