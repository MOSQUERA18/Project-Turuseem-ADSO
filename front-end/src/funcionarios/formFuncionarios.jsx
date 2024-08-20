/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import { ReactSession } from 'react-client-session';

const FormFuncionarios = ({ buttonForm, funcionario, updateTextButton, getAllFuncionarios }) => {
  const [Id_Funcionario, setId_Funcionario] = useState("");
  const [Nom_Funcionario, setNom_Funcionario] = useState("");
  const [Ape_Funcionario, setApe_Funcionario] = useState("");
  const [Genero, setGenero] = useState("");
  const [Tel_Funcionario, setTel_Funcionario] = useState("");
  const [Estado, setEstado] = useState("");
  const [Cargo, setCargo] = useState("");

  // Estado para mensajes
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' o 'error'

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
          `/funcionarios/${funcionario.Id_Funcionario}`,
          {
            Nom_Funcionario,
            Ape_Funcionario,
            Genero,
            Tel_Funcionario,
            Estado,
            Cargo,
          },
          config
        );
      } else if (buttonForm === "Enviar") {
        respuestApi = await clienteAxios.post(
          `/funcionarios`,
          {
            Id_Funcionario,
            Nom_Funcionario,
            Ape_Funcionario,
            Genero,
            Tel_Funcionario,
            Estado,
            Cargo,
          },
          config
        );
      }

      if (respuestApi.status === 201 || respuestApi.status === 200) {
        setMessage("Funcionario registrado correctamente!");
        setMessageType("success");
        clearForm();
        getAllFuncionarios();
        updateTextButton("Enviar");
      } else {
        setMessage(respuestApi.data.message || "Error al registrar el funcionario.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error al registrar el funcionario.");
      setMessageType("error");
    }
  };

  const clearForm = () => {
    setId_Funcionario("");
    setNom_Funcionario("");
    setApe_Funcionario("");
    setGenero("");
    setTel_Funcionario("");
    setEstado("");
    setCargo("");
  };

  const setData = () => {
    setId_Funcionario(funcionario.Id_Funcionario);
    setNom_Funcionario(funcionario.Nom_Funcionario);
    setApe_Funcionario(funcionario.Ape_Funcionario);
    setGenero(funcionario.Genero);
    setTel_Funcionario(funcionario.Tel_Funcionario);
    setEstado(funcionario.Estado);
    setCargo(funcionario.Cargo);
  };

  useEffect(() => {
    setData();
  }, [funcionario]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 content-center w-full">
        <form
          id="funcionarioForm"
          onSubmit={sendForm}
          className="bg-white shadow-2xl rounded-2xl px-14 pt-6 pb-8 mb-4 max-w-3xl w-full mt-10"
        >
          <h1 className="font-bold text-green-600 text-3xl uppercase text-center my-5">
            Registrar Funcionario
          </h1>

          {message && (
            <div className={`p-4 mb-4 text-white rounded-md ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
              {message}
            </div>
          )}

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Documento
            </label>
            <input
              type="text"
              id="id_funcionario"
              placeholder="Documento Funcionario"
              value={Id_Funcionario}
              onChange={(e) => setId_Funcionario(e.target.value)}
              className="w-full p-2 border rounded"
              disabled={buttonForm === "Actualizar"}
            />
          </div>

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Nombres
            </label>
            <input
              type="text"
              id="nombre"
              placeholder="Nombres"
              value={Nom_Funcionario}
              onChange={(e) => setNom_Funcionario(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Apellidos
            </label>
            <input
              type="text"
              id="apellido"
              placeholder="Apellidos"
              value={Ape_Funcionario}
              onChange={(e) => setApe_Funcionario(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Género
            </label>
            <select
              id="genero"
              value={Genero}
              onChange={(e) => setGenero(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            >
              <option value="">Seleccione un Género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              placeholder="Teléfono"
              value={Tel_Funcionario}
              onChange={(e) => setTel_Funcionario(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Estado
            </label>
            <select
              id="estado"
              value={Estado}
              onChange={(e) => setEstado(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            >
              <option value="">Seleccione un Estado</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Cargo
            </label>
            <select
              id="cargo"
              value={Cargo}
              onChange={(e) => setCargo(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            >
              <option value="">Seleccione un Cargo</option>
              <option value="Planta">Planta</option>
              <option value="Contratista">Contratista</option>
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

export default FormFuncionarios;