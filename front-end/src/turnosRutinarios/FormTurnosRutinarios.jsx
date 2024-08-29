/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
import { ReactSession } from "react-client-session";

const FormTurnoRutinario = ({
  buttonForm,
  turnoRutinario,
  updateTextButton,
  getAllTurnosRutinarios,
}) => {
  const [Id_TurnoRutinario, setId_TurnoRutinario] = useState("");
  const [Fec_InicioTurno, setFec_InicioTurno] = useState("");
  const [Fec_FinTurno, setFec_FinTurno] = useState("");
  const [Hor_InicioTurno, setHor_InicioTurno] = useState("");
  const [Hor_FinTurno, setHor_FinTurno] = useState("");
  const [Obs_TurnoRutinario, setObs_TurnoRutinario] = useState("");
  const [Ind_Asistencia, setInd_Asistencia] = useState("");
  const [Id_Aprendiz, setId_Aprendiz] = useState("");
  const [Id_Unidad, setId_Unidad] = useState("");

  const [selectedAprendiz, setSelectedAprendiz] = useState(null);
  const [selectedUnidad, setSelectedUnidad] = useState(null);

  const [Aprendiz, setAprendiz] = useState([]);
  const [Unidad, setUnidad] = useState([]);
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    const getAllAprendiz = async () => {
      try {
        const token = ReactSession.get("token");
        const responseAprendiz = await clienteAxios("/Aprendiz", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (responseAprendiz.status == 200) {
          setAprendiz(responseAprendiz.data);
        }
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };
    getAllAprendiz();
    const getAllUnidad = async () => {
      try {
        const token = ReactSession.get("token");
        const responseUnidad = await clienteAxios("/unidades", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (responseUnidad.status == 200) {
          setUnidad(responseUnidad.data);
        }
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };
    getAllUnidad();
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
          `/turnoRutinario/${Id_TurnoRutinario}`,
          {
            Fec_InicioTurno,
            Fec_FinTurno,
            Hor_InicioTurno,
            Hor_FinTurno,
            Obs_TurnoRutinario,
            Ind_Asistencia,
            Id_Aprendiz,
            Id_Unidad,
          },
          config
        );
        console.log(respuestApi);
      } else if (buttonForm === "Enviar") {
        respuestApi = await clienteAxios.post(
          `/turnoRutinario`,
          {
            Fec_InicioTurno,
            Fec_FinTurno,
            Hor_InicioTurno,
            Hor_FinTurno,
            Obs_TurnoRutinario,
            Ind_Asistencia,
            Id_Aprendiz,
            Id_Unidad,
          },
          config
        );
      }

      if (respuestApi.status === 201 || respuestApi.status === 200) {
        setAlerta({
          msg: `Registro exitoso!`,
        });
        clearForm();
        getAllTurnosRutinarios();
        updateTextButton("Enviar");
      } else {
        setAlerta({
          msg: respuestApi.error.message || `Error al crear el Turno!`,
          error: true,
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setAlerta({
        msg: "Ocurrio un error!, Intente de nuevo.",
        error: true,
      });
    }
  };

  const clearForm = () => {
    setId_TurnoRutinario("");
    setFec_InicioTurno("");
    setFec_FinTurno("");
    setHor_InicioTurno("");
    setHor_FinTurno("");
    setObs_TurnoRutinario("");
    setInd_Asistencia("");
    setId_Aprendiz("");
    setId_Unidad("");
  };

  const setData = () => {
    setId_TurnoRutinario(turnoRutinario.Id_TurnoRutinario);
    setFec_InicioTurno(turnoRutinario.Fec_InicioTurno);
    setFec_FinTurno(turnoRutinario.Fec_FinTurno_);
    setHor_InicioTurno(turnoRutinario.Hor_InicioTurno);
    setHor_FinTurno(turnoRutinario.Hor_FinTurno);
    setObs_TurnoRutinario(turnoRutinario.Obs_TurnoRutinario);
    setInd_Asistencia(turnoRutinario.Ind_Asistencia);
    setId_Aprendiz(turnoRutinario.Id_Aprendiz || "");
    setId_Unidad(turnoRutinario.Id_Unidad || "");
    const selectedFic = Aprendiz.find(
      (Aprendiz) => Aprendiz.Id_Aprendiz === turnoRutinario.Id_Aprendiz
    );
    setSelectedAprendiz(selectedFic || null);
    const selectedUni = Unidad.find(
      (unidad) => unidad.Id_Unidad === turnoRutinario.Id_Unidad
    );
    setSelectedUnidad(selectedUni || null);
  };

  useEffect(() => {
    setData();
  }, [turnoRutinario]);
  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 content-center w-full">
        <form
          id="turnoRutinarioForm"
          onSubmit={sendForm}
          className="bg-white shadow-2xl rounded-2xl px-14 pt-6 pb-8 mb-4 max-w-3xl w-full mt-10"
        >
          {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
          <h1 className="font-bold text-green-600 text-3xl uppercase text-center my-5">
            Crear Turnos Rutinarios
          </h1>
          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Fecha De Inicio Turno Rutinario
            </label>
            <input
              type="date"
              id="nombre"
              value={Fec_InicioTurno}
              onChange={(e) => setFec_InicioTurno(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Fecha Fin Del Turno Rutinario
            </label>
            <input
              type="date"
              id="nombre"
              value={Fec_FinTurno}
              onChange={(e) => setFec_FinTurno(e.target.value)}
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
                value={Hor_InicioTurno}
                onChange={(e) => setHor_InicioTurno(e.target.value)}
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
                value={Hor_FinTurno}
                onChange={(e) => setHor_FinTurno(e.target.value)}
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
              value={Obs_TurnoRutinario}
              onChange={(e) => setObs_TurnoRutinario(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Indicador De Asistencia
            </label>
            <select
              id="ind_Asistencia"
              value={Ind_Asistencia}
              onChange={(e) => setInd_Asistencia(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            >
              <option value="">Seleccione un Aprendiz:</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Aprendiz
            </label>
            <select
              id="Aprendiz"
              value={Id_Aprendiz}
              onChange={(e) => setId_Aprendiz(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            >
              <option value="">Seleccione un Aprendiz:</option>
              {Aprendiz.map((Aprendiz) => (
                <option key={Aprendiz.Id_Aprendiz} value={Aprendiz.Id_Aprendiz}>
                  {Aprendiz.Nom_Aprendiz}
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
              {Unidad.map((unidad) => (
                <option key={unidad.Id_Unidad} value={unidad.Id_Unidad}>
                  {unidad.Nom_Unidad}
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

export default FormTurnoRutinario;
