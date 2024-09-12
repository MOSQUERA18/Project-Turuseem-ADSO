import TurnosRutinariosModel from "../models/turnoRutinarioModel.js";
import ApprenticeModel from "../models/apprenticeModel.js";
import UnitModel from "../models/unitModel.js";
import { logger } from "../middleware/logMiddleware.js";
import AbsenceModel from "../models/absenceModel.js";
import FichasModel from "../models/fichasModel.js";
import ProgramaModel from "../models/programaModel.js";
import cron from "node-cron"


cron.schedule('0 10 * * 4', () => {
  console.log('Tarea programada ejecutada con exito');
});

export const getAllTurnosRutinarios = async (req, res) => {
  try {
    // Intento de obtener todos los turnos rutinarios con relaciones anidadas.
    const turnosRutinarios = await TurnosRutinariosModel.findAll({
      include: [
        {
          model: ApprenticeModel,
          as: "aprendiz",
          include: [
            {
              model: FichasModel,
              as: "fichas",
              include: [
                {
                  model: ProgramaModel,
                  as: "programasFormacion",
                },
              ],
            },
          ],
        },
        {
          model: UnitModel,
          as: "unidad",
        },
      ],
    });
    // Verifico si se encontraron turnos rutinarios.
    if (turnosRutinarios.length > 0) {
      res.status(200).json(turnosRutinarios);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "No se encontraron turnos rutinarios.",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la consulta.
    logger.error(`Error al obtener los turnos rutinarios: ${error.message}`);
    res.status(500).json({
      message: "Error al obtener los turnos rutinarios.",
    });
  }
};

export const getTurnoRutinario = async (req, res) => {
  try {


    // Intento de obtener un turno rutinario específico por ID con relaciones anidadas.
    const turnoRutinario = await TurnosRutinariosModel.findByPk(
      req.params.Id_TurnoRutinario,
      {
        include: [
          {
            model: ApprenticeModel,
            as: "aprendiz",
            include: [
              {
                model: FichasModel,
                as: "fichas",
                include: [
                  {
                    model: ProgramaModel,
                    as: "programasFormacion",
                  },
                ],
              },
            ],
          },
          {
            model: UnitModel,
            as: "unidad",
          },
        ],
      }
    );
    // Verifico si se encontró el turno rutinario.
    if (turnoRutinario) {
      res.status(200).json(turnoRutinario);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "Turno rutinario no encontrado.",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la consulta.
    logger.error(`Error al obtener el turno rutinario: ${error.message}`);
    res.status(500).json({
      message: "Error al obtener el turno rutinario.",
    });
  }
};

export const createTurnoRutinario = async (req, res) => {
  try {
    // Obtengo los datos del cuerpo de la solicitud.
    const {
      Fec_InicioTurno,
      Fec_FinTurno,
      Hor_InicioTurno,
      Hor_FinTurno,
      Obs_TurnoRutinario,
      Ind_Asistencia,
      Id_Aprendiz,
      Id_Unidad,
    } = req.body;

    // Intento de crear un nuevo turno rutinario con los datos proporcionados.
    const newTurnoRutinario = await TurnosRutinariosModel.create({
      Fec_InicioTurno,
      Fec_FinTurno,
      Hor_InicioTurno,
      Hor_FinTurno,
      Obs_TurnoRutinario,
      Ind_Asistencia,
      Id_Aprendiz,
      Id_Unidad,
    });
    // Verifico si se creó el nuevo turno rutinario.
    if (newTurnoRutinario) {
      res.status(201).json(newTurnoRutinario);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la creación.
    logger.error(`Error al crear el turno rutinario: ${error.message}`);
    res.status(500).json({
      message: "Error al crear el turno rutinario.",
    });
  }
};

export const updateTurnoRutinario = async (req, res) => {
  try {
    // Obtengo los datos del cuerpo de la solicitud.
    const {
      Fec_InicioTurno,
      Fec_FinTurno,
      Hor_InicioTurno,
      Hor_FinTurno,
      Obs_TurnoRutinario,
      Ind_Asistencia,
      Id_Aprendiz,
      Id_Unidad,
    } = req.body;

    // Intento de actualizar un turno rutinario específico por ID.
    const [updated] = await TurnosRutinariosModel.update(
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
      {
        where: { Id_TurnoRutinario: req.params.Id_TurnoRutinario },
      }
    );

    // Verifico si se realizó alguna actualización.
    if (updated === 0) {
      res.status(404).json({
        message: "Turno rutinario no encontrado.",
      });
    } else {
      // Si `Ind_Asistencia` es "Sí", elimino la inasistencia correspondiente.
      if (Ind_Asistencia === "Si") {
        await AbsenceModel.destroy({
          where: {
            Id_TurnoRutinario: req.params.Id_TurnoRutinario,
          },
        });
      }
      res.json({
        message:
          "Turno rutinario actualizado correctamente y se eliminó la inasistencia si existía.",
      });
      return; // Uso de return para salir de la función después de enviar la respuesta.
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la actualización.
    logger.error(`Error al actualizar el turno rutinario: ${error.message}`);
    res.status(500).json({
      message: "Error al actualizar el turno rutinario.",
    });
  }
};

export const deleteTurnoRutinario = async (req, res) => {
  try {
    // Intento de eliminar un turno rutinario específico por ID.
    const result = await TurnosRutinariosModel.destroy({
      where: { Id_TurnoRutinario: req.params.Id_TurnoRutinario },
    });
    // Verifico si se realizó la eliminación.
    if (result === 0) {
      res.status(404).json({
        message: "Turno rutinario no encontrado.",
      });
    } else {
      res.json({
        message: "Turno rutinario eliminado correctamente.",
      });
      return; // Uso de return para salir de la función después de enviar la respuesta.
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la eliminación.
    logger.error(`Error al eliminar el turno rutinario: ${error.message}`);
    res.status(500).json({
      message: "Error al eliminar el turno rutinario.",
    });
  }
};


export const getTurnoRutinariosForAprendiz = async (req, res) => {
  try {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const turnoRutinarioForAprendiz = await TurnosRutinariosModel.findAll({
      where: { 
        Id_Aprendiz: req.params.Id_Aprendiz,
        Fec_InicioTurno: { [Op.lte]: hoy },
        Fec_FinTurno: { [Op.gte]: hoy }
      },
      include: [
        {
          model: ApprenticeModel,
          as: "aprendiz",
        },
        {
          model: UnitModel,
          as: "unidad",
        },
      ],
    });

    if (turnoRutinarioForAprendiz.length === 0) {
      res.status(404).json({ message: "No tienes turno programado para hoy" });
      return;
    }

    res.status(200).json(turnoRutinarioForAprendiz);
  } catch (error) {
    logger.error(`Error al obtener los turnos rutinarios para el aprendiz: ${error.message}`);
    res.status(500).json({
      message: "Error al obtener los turnos rutinarios para el aprendiz.",
    });
  }
};
