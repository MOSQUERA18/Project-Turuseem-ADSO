/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clieteAxios from "../config/axios";

const FormTalentoHumano = ({ buttonForm, talentoHumano, updateTextButton, getAllTalentoHumano }) => {
  const [Ficha, setFicha] = useState([]); // Añade esta línea al inicio del componente
  const [Id_TalentoHumano, setId_TalentoHumano] = useState("");
  const [Nom_TalentoHumano, setNom_TalentoHumano] = useState("");
  const [Ape_TalentoHumano, setApe_TalentoHumano] = useState("");
  const [Gen_TalentoHumano, setGen_TalentoHumano] = useState("");
  const [Cor_TalentoHumano, setCor_TalentoHumano] = useState("");
  const [Tel_TalentoHumano, setTel_TalentoHumano] = useState("");
  const [Id_Ficha, setId_Ficha] = useState("");
  const [Est_TalentoHumano, setEst_TalentoHumano] = useState("");    

  // Estado para mensajes
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' o 'error'

  useEffect(() => {
    const fetchFicha = async () => {
      try {
        const token = localStorage.getItem("token")
        // if (!token) 
        //   console.error("No se encontró el token de autenticación.");
        //   return;
        // };
        const response = await clieteAxios.get('/fichas', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if(response.status === 200){
          setFicha(response.data); // Aquí guardas las fichas en el estado
        }
      } catch (error) {
        console.error('Error fetching ficha:', error);
      }
    };
  
    fetchFicha();
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
          `/talentoHumano/${talentoHumano.Id_TalentoHumano}`,
          {
            Id_TalentoHumano,
            Nom_TalentoHumano,
            Ape_TalentoHumano,
            Gen_TalentoHumano,
            Cor_TalentoHumano,
            Tel_TalentoHumano,
            Id_Ficha,
            Est_TalentoHumano,
          },
          config
        );
      } else if (buttonForm === "Enviar") {
        respuestApi = await clieteAxios.post(
          `/talentoHumano`,
          {
            Id_TalentoHumano,
            Nom_TalentoHumano,
            Ape_TalentoHumano,
            Gen_TalentoHumano,
            Cor_TalentoHumano,
            Tel_TalentoHumano,
            Id_Ficha,
            Est_TalentoHumano,
          },
          config
        );
      }

      if (respuestApi.status === 201 || respuestApi.status === 200) {
        setMessage("Talento Humano registrado correctamente!");
        setMessageType("success");
        clearForm();
        getAllTalentoHumano();
        updateTextButton("Enviar");
      } else {
        setMessage(respuestApi.data.message || "Error al registrar Talento Humano.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error al registrar Talento Humano.");
      setMessageType("error");
    }
  };

  const clearForm = () => {
    setId_TalentoHumano(""),
    setNom_TalentoHumano(""),
    setApe_TalentoHumano(""),
    setGen_TalentoHumano(""),
    setCor_TalentoHumano(""),
    setTel_TalentoHumano(""),
    setId_Ficha(""),
    setEst_TalentoHumano("")
  };

  const setData = () => {
    setId_TalentoHumano(talentoHumano.Id_TalentoHumano);
    setNom_TalentoHumano(talentoHumano.Nom_TalentoHumano);
    setApe_TalentoHumano(talentoHumano.Ape_TalentoHumano);
    setGen_TalentoHumano(talentoHumano.Gen_TalentoHumano);
    setCor_TalentoHumano(talentoHumano.Cor_TalentoHumano);
    setTel_TalentoHumano(talentoHumano.Tel_TalentoHumano);
    setId_Ficha(talentoHumano.Id_Ficha);
  
    // Verifica que Ficha esté disponible antes de buscar
    if (Ficha.length > 0) {
      const selected = Ficha.find(ficha => ficha.Id_TalentoHumano === talentoHumano.Id_TalentoHumano);
      setSelectedFicha(selected || null);
    }
    
    setEst_TalentoHumano(talentoHumano.Est_TalentoHumano);
  };  

  useEffect(() => {
    setData();
  }, [talentoHumano]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 content-center w-full">
        <form
          id="humanTalentForm"
          onSubmit={sendForm}
          className="bg-white shadow-2xl rounded-2xl px-14 pt-6 pb-8 mb-4 max-w-3xl w-full mt-10"
         >
          <h1 className="font-bold text-green-600 text-3xl uppercase text-center my-5">
            Registrar Talento Humano
          </h1>

          {message && (
            <div className={`p-4 mb-4 text-white rounded-md ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
              {message}
            </div>
          )}

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Documento Talento Humano
            </label>
            <input
              type="number"
              id="documento"
              placeholder="Documento"
              value={Id_TalentoHumano}
              onChange={(e) => setId_TalentoHumano(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Nombre Talento Humano
            </label>
            <input
              type="text"
              id="nombre"
              placeholder="Nombre"
              value={Nom_TalentoHumano}
              onChange={(e) => setNom_TalentoHumano(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Apellido Talento Humano
            </label>
            <input
              type="text"
              id="apellido"
              placeholder="Apellido"
              value={Ape_TalentoHumano}
              onChange={(e) => setApe_TalentoHumano(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Genero:
            </label>
            <select
              id="genero"
              value={Gen_TalentoHumano}
              onChange={(e) => setGen_TalentoHumano(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            >
              <option value="">Seleccione un Genero:</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Correo Talento Humano
            </label>
            <input
              type="email"
              id="correo"
              placeholder="Correo"
              value={Cor_TalentoHumano}
              onChange={(e) => setCor_TalentoHumano(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Telefono Talento Humano
            </label>
            <input
              type="number"
              id="telefono"
              placeholder="Telefono"
              value={Tel_TalentoHumano}
              onChange={(e) => setTel_TalentoHumano(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Ficha Perteneciente: 
            </label>
            <select
              id="id_ficha"
              value={Id_Ficha}
              onChange={(e) => setId_Ficha(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            >
              <option value="">Seleccione una Ficha:</option>
              {Ficha.map((ficha) => (
                <option key={ficha.Id_Ficha} value={ficha.Id_Ficha}>
                  {ficha.Nom_Ficha}
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
              value={Est_TalentoHumano}
              onChange={(e) => setEst_TalentoHumano(e.target.value)}
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

export default FormTalentoHumano;