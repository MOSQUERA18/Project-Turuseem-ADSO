/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";

import Alerta from "../components/Alerta";
import { ReactSession } from 'react-client-session';

const FormTalentoHumano = ({ buttonForm, talentoHumano, updateTextButton, getAllTalentoHumano }) => {
 
  const [Id_Talento_Humano, setId_Talento_Humano] = useState("");
  const [Nom_Talento_Humano, setNom_Talento_Humano] = useState("");
  const [Ape_Talento_Humano, setApe_Talento_Humano] = useState("");
  const [Genero_Talento_Humano, setGen_Talento_Humano] = useState("");
  const [Cor_Talento_Humano, setCor_Talento_Humano] = useState("");
  const [Tel_Talento_Humano, setTel_Talento_Humano] = useState("");
  const [Id_Ficha, setId_Ficha] = useState("");
  const [Estado, setEstado] = useState("");    
  const [selectedFicha,setSelectedFicha] = useState(null);
  const [Ficha, setFicha] = useState([]);

  // Estado para mensajes
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' o 'error'
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    const fetchFichas = async () => {
      try {
        const token = ReactSession.get("token")
        const response = await clienteAxios.get('/fichas', {
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
  
    fetchFichas();
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
      let successMessage = "";
      let respuestApi;
      if (buttonForm === "Actualizar") {
        respuestApi = await clienteAxios.put(
          `/talentoHumano/${talentoHumano.Id_Talento_Humano}`,
          {
            // Id_Talento_Humano,
            Nom_Talento_Humano,
            Ape_Talento_Humano,
            Genero_Talento_Humano,
            Cor_Talento_Humano,
            Tel_Talento_Humano,
            Id_Ficha,
            Estado,
          },
          config
        );
        successMessage = "Talento Humano actualizado correctamente!";
      } else if (buttonForm === "Enviar") {
        respuestApi = await clienteAxios.post(
          `/talentohumano`,
          {
            Id_Talento_Humano,
            Nom_Talento_Humano,
            Ape_Talento_Humano,
            Genero_Talento_Humano,
            Cor_Talento_Humano,
            Tel_Talento_Humano,
            Id_Ficha,
            Estado,
          },
          config
        );
        successMessage = "Talento Humano registrado correctamente!";
      }

      if (respuestApi.status === 201 || respuestApi.status === 200) {
        setMessage(successMessage);
        setMessageType("success");
        getAllTalentoHumano()
        clearForm();
        updateTextButton("Enviar");
      } else {
        setMessage(respuestApi.data.message || "Error al registrar Talento Humano .");
        setMessageType("error");
      }
    } catch (error) {
      setAlerta({
        msg: "Todos los campos son obligatorios o Documento Repetido!",
        error: true,
      });

    }
  };

  const clearForm = () => {
    setId_Talento_Humano(""),
    setNom_Talento_Humano(""),
    setApe_Talento_Humano(""),
    setGen_Talento_Humano(""),
    setCor_Talento_Humano(""),
    setTel_Talento_Humano(""),
    setId_Ficha(""),
    setEstado("")
  };

  const setData = () => {
    setId_Talento_Humano(talentoHumano.Id_Talento_Humano);
    setNom_Talento_Humano(talentoHumano.Nom_Talento_Humano);
    setApe_Talento_Humano(talentoHumano.Ape_Talento_Humano);
    setGen_Talento_Humano(talentoHumano.Genero_Talento_Humano);
    setCor_Talento_Humano(talentoHumano.Cor_Talento_Humano);
    setTel_Talento_Humano(talentoHumano.Tel_Talento_Humano);
    setId_Ficha(talentoHumano.Id_Ficha);
    // Verifica que Ficha esté disponible antes de buscar
      const selected = Ficha.find(ficha => ficha.Id_Ficha === talentoHumano.Id_Ficha);
      setSelectedFicha(selected || null);
    
    
    setEstado(talentoHumano.Estado);
  };  

  useEffect(() => {
    setData();
  }, [talentoHumano]);

  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 content-center w-full">
        <form
          id="humanTalentForm"
          onSubmit={sendForm}
          className="bg-white shadow-2xl rounded-2xl px-14 pt-6 pb-8 mb-4 max-w-3xl w-full mt-10"
         >
          {msg && <Alerta alerta={alerta} />}
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
              value={Id_Talento_Humano}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 10) {
                  setId_Talento_Humano(value);
                }
              }}
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
              value={Nom_Talento_Humano}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 30) {
                  setNom_Talento_Humano(value);
                }
              }}
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
              value={Ape_Talento_Humano}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 40) {
                  setApe_Talento_Humano(value);
                }
              }}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Genero:
            </label>
            <select
              id="genero"
              value={Genero_Talento_Humano}
              onChange={(e) => setGen_Talento_Humano(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            >
              <option value="">Seleccione un Genero:</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
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
              value={Cor_Talento_Humano}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 60) {
                  setCor_Talento_Humano(value);
                }
              }}
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
              value={Tel_Talento_Humano}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 10) {
                  setTel_Talento_Humano(value);
                }
              }}
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
              {Ficha.map((fichas) => (
                <option key={fichas.Id_Ficha} value={fichas.Id_Ficha}>
                  {fichas.Id_Ficha}
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