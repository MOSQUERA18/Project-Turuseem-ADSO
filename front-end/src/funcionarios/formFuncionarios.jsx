

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import { ReactSession } from "react-client-session";
import Alerta from "../components/Alerta";

const FormFuncionarios = ({
  buttonForm,
  funcionario,
  updateTextButton,
  getAllFuncionarios,
}) => {
  const [Id_Funcionario, setId_Funcionario] = useState("");
  const [Nom_Funcionario, setNom_Funcionario] = useState("");
  const [Ape_Funcionario, setApe_Funcionario] = useState("");
  const [Genero, setGenero] = useState("");
  const [Tel_Funcionario, setTel_Funcionario] = useState("");
  const [Estado, setEstado] = useState("");
  const [Cargo, setCargo] = useState("");
  const [alerta, setAlerta] = useState({});

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
      let mensajeCRUD = "";
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
        mensajeCRUD = "Funcionario actualizado correctamente!";
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
        mensajeCRUD = "Funcionado Registrado correctamente!";
      }

      if (respuestApi.status === 201 || respuestApi.status === 200) {
        setAlerta({
          msg: mensajeCRUD,
          error: false,
        });
        clearForm();
        getAllFuncionarios();
        updateTextButton("Enviar");
      } else {
        setAlerta({
          msg: "Ha ocurrido un error!",
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: "Todos los campos son obligatorios!",
        error: true,
      });
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

  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-center items-center">
        <form
          id="funcionarioForm"
          onSubmit={sendForm}
          className="bg-white rounded-2xl px-8 pb-6 w-full max-w-4xl"
        >
          {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Documento
            </label>
            <input
              type="text"
              id="id_funcionario"
              placeholder="Documento Funcionario"
              value={Id_Funcionario}
              onChange={(e) => setId_Funcionario(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              disabled={buttonForm === "Actualizar"}
            />
          </div>
          <div className="flex items-center mb-3 space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Nombres
              </label>
              <input
                type="text"
                id="nombre"
                placeholder="Nombres"
                value={Nom_Funcionario}
                onChange={(e) => setNom_Funcionario(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Apellidos
              </label>
              <input
                type="text"
                id="apellido"
                placeholder="Apellidos"
                value={Ape_Funcionario}
                onChange={(e) => setApe_Funcionario(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
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
            <label className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              placeholder="Teléfono"
              value={Tel_Funcionario}
              onChange={(e) => setTel_Funcionario(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            />
          </div>
          <div className="flex items-center mb-3 space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
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

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
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
          </div>
          <hr className="mt-3" />
          <div className="flex justify-around mt-2">
            <input
              type="submit"
              id="button"
              value={buttonForm}
              className="bg-green-600 w-full py-3 px-8 rounded-xl text-white mt-2 uppercase font-bold hover:cursor-pointer hover:bg-blue-800 md:w-auto"
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
