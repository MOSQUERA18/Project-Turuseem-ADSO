/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clieteAxios from "../config/axios";

const FormUnidades = ({ buttonForm, unidad, updateTextButton, getAllUnidades }) => {
  // const [Id_Unidad, setId_Unidad] = useState("");
  const [Nom_Unidad, setNom_Unidad] = useState("");
  const [Hor_Apertura, setHor_Apertura] = useState("");
  const [Hor_Cierre, setHor_Cierre] = useState("");
  const [Estado, setEstado] = useState("");
  const [Id_Area, setId_Area] = useState("");  // Añadido para el área
  const [selectedArea, setSelectedArea] = useState(null);
  const [Areas, setAreas] = useState([]);  // Estado para áreas

  // Obtener las áreas desde la API
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await clieteAxios.get('/areas', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAreas(response.data);
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };
    

    fetchAreas();
  }, []);

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
      if (buttonForm === "Actualizar") {
        const respuestApi = await clieteAxios.put(
          `/unidades/${unidad.Id_Unidad}`,
          {
            
            Nom_Unidad,
            Hor_Apertura,
            Hor_Cierre,
            Estado,
            Id_Area,
          },
          config
        );
        if (respuestApi.status === 200) {
          alert(respuestApi.data.message);
          updateTextButton("Enviar");
          clearForm();
          getAllUnidades()
        } else {
          alert(respuestApi.data.message);
        }
      } else if (buttonForm === "Enviar") {
        const respuestApi = await clieteAxios.post(
          `/unidades`,
          {
            
            Nom_Unidad,
            Hor_Apertura,
            Hor_Cierre,
            Estado,
            Id_Area,
          },
          config
        );
        if (respuestApi.status === 201) {
          alert(respuestApi.data.message);
          clearForm();
          getAllUnidades()
        } else {
          alert(respuestApi.data.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearForm = () => {
    
    setNom_Unidad("");
    setHor_Apertura("");
    setHor_Cierre("");
    setEstado("");
    setId_Area("");
    setSelectedArea(null);
  };

  const setData = () => {
    
    setNom_Unidad(unidad.Nom_Unidad);
    setHor_Apertura(unidad.Hor_Apertura);
    setHor_Cierre(unidad.Hor_Cierre);
    setEstado(unidad.Estado);
    setId_Area(unidad.Id_Area);
    const selected = Areas.find(Areas => Areas.Id_Area === unidad.Id_Area);
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
          action=""
          onSubmit={sendForm}
          className="bg-white shadow-2xl rounded-2xl px-14 pt-6 pb-8 mb-4 max-w-3xl w-full mt-10"
        >
          <h1 className="font-bold text-green-600 text-3xl uppercase text-center my-5">
            Registrar Unidades
          </h1>

          {/* <div className="mb-3">
            <label
              htmlFor="id_unidad"
              className="text-gray-700 uppercase font-bold"
            >
              Id_Unidad :
            </label>
            <input
              type="number"
              id="id_unidad"
              placeholder="Documento del Aprendiz"
              value={Id_Unidad}
              onChange={(e) => setId_Unidad(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            />
          </div> */}

          <div className="flex space-x-12 mb-3">
            <div className="w-1/2">
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
          </div>

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Hora Cierre:
            </label>
            <input
              type="time"
              id="hora_cierre"
              value={Hor_Cierre}
              onChange={(e) => setHor_Cierre(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            />
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
              {Areas.map((Areas) => (
                <option key={Areas.Id_Area} value={Areas.Id_Area}>
                {Areas.Nom_Area}
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

export default FormUnidades;
