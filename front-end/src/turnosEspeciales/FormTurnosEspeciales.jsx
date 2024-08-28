/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
import { ReactSession } from "react-client-session";

const FormTurnosEspeciales = ({
  buttonForm,
  turnoEspecial,
  updateTextButton,
  getAllTurnosEspeciales,
}) => {
  const [Id_TurnoEspecial, setId_TurnoEspecial] = useState("");
  const [Fec_TurnoEspecial, setFec_TurnoEspecial] = useState("");
  const [Hor_Inicio, setHor_Inicio] = useState("");
  const [Hor_Fin, setHor_Fin] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [totAprendices, setTotAprendices] = useState("");
  const [Id_Ficha, setId_Ficha] = useState("");
  const [Img_Asistencia, setImg_Asistencia] = useState("");
  const [Id_Funcionario, setId_Funcionario] = useState("");
  const [Id_Unidad, setId_Unidad] = useState("");

  const [selectedFicha, setSelectedFicha] = useState(null);
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);
  const [selectedUnidad, setSelectedUnidad] = useState(null);

  const [Fichas, setFichas] = useState([]);
  const [Funcionarios, setFuncionarios] = useState([]);
  const [Unidades, setUnidades] = useState([]);
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    const getAllFichas = async () => {
      try {
        const token = ReactSession.get("token");
        const responseFichas = await clienteAxios("/fichas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (responseFichas.status == 200) {
          setFichas(responseFichas.data);
        }
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };
    getAllFichas();
    const getAllFuncionarios = async () => {
      try {
        const token = ReactSession.get("token");
        const responseFuncionarios = await clienteAxios("/funcionarios", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (responseFuncionarios.status == 200) {
          setFuncionarios(responseFuncionarios.data);
        }
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };
    getAllFuncionarios();
    const getAllUnidades = async () => {
      try {
        const token = ReactSession.get("token");
        const responseUnidades = await clienteAxios("/unidades", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (responseUnidades.status == 200) {
          setUnidades(responseUnidades.data);
        }
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };
    getAllUnidades();
  }, []);

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
          `/turnoespecial/${Id_TurnoEspecial}`,
          {
            Fec_TurnoEspecial,
            Hor_Inicio,
            Hor_Fin,
            observaciones,
            totAprendices,
            Id_Ficha,
            Img_Asistencia,
            Id_Funcionario,
            Id_Unidad,
          },
          config
        );
      } else if (buttonForm === "Enviar") {
        respuestApi = await clienteAxios.post(
          `/unidades`,
          {
            Fec_TurnoEspecial,
            Hor_Inicio,
            Hor_Fin,
            observaciones,
            totAprendices,
            Id_Ficha,
            Img_Asistencia,
            Id_Funcionario,
            Id_Unidad,
          },
          config
        );
      }

      if (respuestApi.status === 201 || respuestApi.status === 200) {
        setAlerta({
          msg: `Registro exitoso!`,
          error: false,
        });
        clearForm();
        getAllTurnosEspeciales();
        updateTextButton("Enviar");
      } else {
        setAlerta({
          msg: respuestApi.error.message || `Error al crear el Turno!`,
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: "Ocurrio un error!, Intente de nuevo.",
        error: true,
      });
    }
  };

  const clearForm = () => {
    setId_TurnoEspecial("");
    setFec_TurnoEspecial("");
    setHor_Inicio("");
    setHor_Fin("");
    setObservaciones("");
    setTotAprendices("");
    setId_Ficha("");
    setImg_Asistencia("");
    setId_Funcionario("");
    setId_Unidad("");

    // setSelectedArea(null);
  };
  console.log(turnoEspecial);

  const setData = () => {
    // setId_TurnoEspecial(turnoEspecial.Id_TurnoEspecial);
    setFec_TurnoEspecial(turnoEspecial.Fec_TurnoEspecial);
    setHor_Inicio(turnoEspecial.Hor_Inicio);
    setHor_Fin(turnoEspecial.Hor_Fin);
    setObservaciones(turnoEspecial.Obs_TurnoEspecial);
    setTotAprendices(turnoEspecial.Tot_AprendicesAsistieron);
    setId_Ficha(turnoEspecial.Id_Ficha || "");
    // setImg_Asistencia(turnoEspecial.Img_Asistencia);
    setId_Funcionario(turnoEspecial.Id_Funcionario || "");
    setId_Unidad(turnoEspecial.Id_Unidad || "");
    const selectedFic = Fichas.find(ficha => ficha.Id_Ficha === turnoEspecial.Id_Ficha);
    setSelectedFicha(selectedFic || null);
    const selectedFun = Funcionarios.find(funcionario => funcionario.Id_Funcionario === turnoEspecial.Id_Funcionario);
    setSelectedFuncionario(selectedFun || null);
    const selectedUni = Unidades.find(unidad => unidad.Id_Unidad === turnoEspecial.Id_Unidad);
    setSelectedUnidad(selectedUni || null);
  };

  useEffect(() => {
    setData();
  }, [turnoEspecial]);
  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 content-center w-full">
        <form
          id="turnoEspecialForm"
          onSubmit={sendForm}
          className="bg-white shadow-2xl rounded-2xl px-14 pt-6 pb-8 mb-4 max-w-3xl w-full mt-10"
        >
          {msg && <Alerta alerta={alerta} />}
          <h1 className="font-bold text-green-600 text-3xl uppercase text-center my-5">
            Crear Turnos Especiales
          </h1>
          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Fecha Turno Especial
            </label>
            <input
              type="date"
              id="nombre"
              value={Fec_TurnoEspecial}
              onChange={(e) => setFec_TurnoEspecial(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex items-center mb-3 space-x-4">
            <div className="w-1/2">
              <label className="text-gray-700 uppercase font-bold">
                Hora Inicio
              </label>
              <input
                type="time"
                id="hora_inicio"
                value={Hor_Inicio}
                onChange={(e) => setHor_Inicio(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="w-1/2">
              <label className="text-gray-700 uppercase font-bold">
                Hora Fin
              </label>
              <input
                type="time"
                id="hora_fin"
                value={Hor_Fin}
                onChange={(e) => setHor_Fin(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Observaciones
            </label>
            <textarea
              id="observaciones"
              placeholder="Observaciones"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Total Aprendices
            </label>
            <input
              type="text"
              id="total_aprendices"
              placeholder="Total Aprendices Asistieron"
              value={totAprendices}
              onChange={(e) => setTotAprendices(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">Ficha</label>
            <select
              id="ficha"
              value={Id_Ficha}
              onChange={(e) => setId_Ficha(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            >
              <option value="">Seleccione una Ficha:</option>
              {Fichas.map((ficha) => (
                <option key={ficha.Id_Ficha} value={ficha.Id_Ficha}>
                  {ficha.Id_Ficha}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="mb-3">
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
          </div> */}

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Funcionario
            </label>
            <select
              id="funcionario"
              value={Id_Funcionario}
              onChange={(e) => setId_Funcionario(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            >
              <option value="">Seleccione un Funcionario:</option>
              {Funcionarios.map((funcionario) => (
                <option
                  key={funcionario.Id_Funcionario}
                  value={funcionario.Id_Funcionario}
                >
                  {funcionario.Nom_Funcionario}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">Unidad</label>
            <select
              id="unidad"
              value={Id_Unidad}
              onChange={(e) => setId_Unidad(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            >
              <option value="">Seleccione una Unidad:</option>
              {Unidades.map((unidad) => (
                <option key={unidad.Id_Unidad} value={unidad.Id_Unidad}>
                  {unidad.Nom_Unidad}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Imagen Asistencia
            </label>
            <input
              type="file"
              id="imagen_asistencia"
              value={Img_Asistencia}
              onChange={(e) => setImg_Asistencia(e.target.value)}
              className="w-full p-2 border rounded"
            />
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

export default FormTurnosEspeciales;
