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
  // Estados del formulario
  const [Id_TurnoRutinario, setId_TurnoRutinario] = useState("");
  const [Fec_InicioTurno, setFec_InicioTurno] = useState("");
  const [Fec_FinTurno, setFec_FinTurno] = useState("");
  const [Hor_InicioTurno, setHor_InicioTurno] = useState("");
  const [Hor_FinTurno, setHor_FinTurno] = useState("");
  const [Obs_TurnoRutinario, setObs_TurnoRutinario] = useState("");
  const [Ind_Asistencia, setInd_Asistencia] = useState("");
  const [Id_Aprendiz, setId_Aprendiz] = useState("");
  const [Id_Unidad, setId_Unidad] = useState("");

  // Estados para datos adicionales
  const [selectedAprendiz, setSelectedAprendiz] = useState(null);
  const [selectedUnidad, setSelectedUnidad] = useState(null);
  const [Aprendiz, setAprendiz] = useState([]);
  const [Unidad, setUnidad] = useState([]);
  const [alerta, setAlerta] = useState({});

  // Obtener datos de Aprendiz y Unidad
  useEffect(() => {
    const getAllAprendiz = async () => {
      try {
        const token = ReactSession.get("token");
        const responseAprendiz = await clienteAxios("/Aprendiz", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (responseAprendiz.status === 200) {
          setAprendiz(responseAprendiz.data);
        }
      } catch (error) {
        console.error("Error fetching Aprendiz:", error);
      }
    };

    const getAllUnidad = async () => {
      try {
        const token = ReactSession.get("token");
        const responseUnidad = await clienteAxios("/unidades", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (responseUnidad.status === 200) {
          setUnidad(responseUnidad.data);
        }
      } catch (error) {
        console.error("Error fetching Unidad:", error);
      }
    };

    getAllAprendiz();
    getAllUnidad();
  }, []);

  // Enviar formulario
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
      let mensajeCRUD = ""
      let respuestApi;
      
      // Determinar si es actualización o creación
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
        mensajeCRUD = "Turno Rutinario Actualizado Exitosamente"
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
         mensajeCRUD = "Turno Rutinario Registrado Exitosamente"
        getAllTurnosRutinarios();  // Actualiza la lista de turnos rutinarios
      }

      // Manejo de respuesta exitosa
      if (respuestApi.status === 201 || respuestApi.status === 200) {
        setAlerta({
          msg: mensajeCRUD,
          error:false
        })
        // Crear o eliminar registro de inasistencia según Ind_Asistencia
        const turnoRutinarioId = respuestApi.data.Id_TurnoRutinario || Id_TurnoRutinario;
        if (Ind_Asistencia === "No") {
          await crearRegistroInasistencia(turnoRutinarioId);
        } else if (Ind_Asistencia === "Si") {
          await eliminarRegistroInasistencia(turnoRutinarioId);
        }
        getAllTurnosRutinarios();
        clearForm();
        updateTextButton("Enviar");
      } else {
        setAlerta({
          msg: respuestApi.error.message || "Error al crear el Turno!",
          error: true,
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setAlerta({
        msg: "Todos los campos son Obligatorios!",
        error: true,
      });
    }
  };

  // Eliminar registro de inasistencia
  const eliminarRegistroInasistencia = async (Id_TurnoRutinario) => {
    try {
      const token = ReactSession.get("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.delete(`/inasistencias/${Id_TurnoRutinario}`, config);
      console.log("Registro de inasistencia eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar registro de inasistencia:", error);
    }
  };


  // Crear registro de inasistencia
  const crearRegistroInasistencia = async (Id_TurnoRutinario) => {
    try {
      const token = ReactSession.get("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const inasistenciaData = {
        Fec_Inasistencia: Fec_InicioTurno,
        Mot_Inasistencia: Obs_TurnoRutinario,
        Id_TurnoRutinario: Id_TurnoRutinario,
      };

      const respuestaInasistencia = await clienteAxios.post(
        '/inasistencias',
        inasistenciaData,
        config
      );

      console.log("Creando registro de inasistencia con datos:", inasistenciaData); // Agrega este log

      if (respuestaInasistencia.status === 201) {
        console.log('Registro de inasistencia creado exitosamente');
      // Si se registra una inasistencia, incrementamos o decrementamos Tot_Inasistencias del aprendiz
        const action = Ind_Asistencia === "No" ? "incrementar" : "decrementar";        
        await clienteAxios.put(
          `/aprendiz/${Id_Aprendiz}/actualizar-inasistencia`,
          { action },  // Enviar la acción
          config
        );
        console.log('Inasistencia actualizada exitosamente');
      }

      if (respuestaInasistencia.status === 201) {
        console.log('Registro de inasistencia creado exitosamente');
      }
    } catch (error) {
      console.error('Error al crear registro de inasistencia:', error);
    }
  };

  // Limpiar formulario
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

  // Establecer datos en el formulario para edición
  const setData = () => {
    if (turnoRutinario) {
      setId_TurnoRutinario(turnoRutinario.Id_TurnoRutinario);
      setFec_InicioTurno(turnoRutinario.Fec_InicioTurno);
      setFec_FinTurno(turnoRutinario.Fec_FinTurno);
      setHor_InicioTurno(turnoRutinario.Hor_InicioTurno);
      setHor_FinTurno(turnoRutinario.Hor_FinTurno);
      setObs_TurnoRutinario(turnoRutinario.Obs_TurnoRutinario);
      setInd_Asistencia(turnoRutinario.Ind_Asistencia);
      setId_Aprendiz(turnoRutinario.Id_Aprendiz || "");
      setId_Unidad(turnoRutinario.Id_Unidad || "");

      // Seleccionar aprendiz y unidad
      const selectedFic = Aprendiz.find(
        (aprendiz) => aprendiz.Id_Aprendiz === turnoRutinario.Id_Aprendiz
      );
      setSelectedAprendiz(selectedFic || null);
      const selectedUni = Unidad.find(
        (unidad) => unidad.Id_Unidad === turnoRutinario.Id_Unidad
      );
      setSelectedUnidad(selectedUni || null);
    }
  };

  useEffect(() => {
    setData();
  }, [turnoRutinario]);

  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          id="turnoRutinarioForm"
          onSubmit={sendForm}
          className="bg-white shadow-xl rounded-lg p-10 max-w-4xl w-full"
        >
          {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
          <h1 className="font-bold text-green-600 text-3xl uppercase text-center my-5">
            Crear Turnos Rutinarios
          </h1>


          <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Fecha De Inicio Turno Rutinario
            </label>
            <input
              type="date"
              id="Fec_InicioTurno"
              value={Fec_InicioTurno}
              onChange={(e) => setFec_InicioTurno(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Fecha Fin Del Turno Rutinario
            </label>
            <input
              type="date"
              id="Fec_FinTurno"
              value={Fec_FinTurno}
              onChange={(e) => setFec_FinTurno(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center mb-3 space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Hora Inicio
              </label>
              <input
                type="time"
                id="hora_inicio"
                value={Hor_InicioTurno}
                onChange={(e) => setHor_InicioTurno(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Hora Fin
              </label>
              <input
                type="time"
                id="hora_fin"
                value={Hor_FinTurno}
                onChange={(e) => setHor_FinTurno(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Observaciones
            </label>
            <textarea
              id="observaciones"
              placeholder="Observaciones"
              value={Obs_TurnoRutinario}
              onChange={(e) => setObs_TurnoRutinario(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Indicador De Asistencia
            </label>
            <select
              id="ind_Asistencia"
              value={Ind_Asistencia}
              onChange={(e) => setInd_Asistencia(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccione:</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Aprendiz
            </label>
            <select
              id="Aprendiz"
              value={Id_Aprendiz}
              onChange={(e) => setId_Aprendiz(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccione un Aprendiz:</option>
              {Aprendiz.map((Aprendiz) => (
                <option key={Aprendiz.Id_Aprendiz} value={Aprendiz.Id_Aprendiz}>
                  {`${Aprendiz.Nom_Aprendiz} ${Aprendiz.Ape_Aprendiz}`}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Unidad</label>
            <select
              id="unidad"
              value={Id_Unidad}
              onChange={(e) => setId_Unidad(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccione una Unidad:</option>
              {Unidad.map((unidad) => (
                <option key={unidad.Id_Unidad} value={unidad.Id_Unidad}>
                  {unidad.Nom_Unidad}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex justify-around">
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
          </div>
        </form>
      </div>
    </>
  );
};

export default FormTurnoRutinario;
