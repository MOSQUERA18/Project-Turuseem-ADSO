import TurnosRutinariosModel from "../models/turnoRutinarioModel.js";
import ApprenticeModel from "../models/apprenticeModel.js";
import UnitModel from "../models/unitModel.js";
import { logger } from "../middleware/logMiddleware.js";
import AbsenceModel from "../models/absenceModel.js";
import FichasModel from "../models/fichasModel.js";
import ProgramaModel from "../models/programaModel.js";
import cron from "node-cron";
import { Op, Sequelize } from "sequelize";
import OtrosMemorandumModel from "../models/Otros_MemorandosModel.js";

cron.schedule("5 9 * * *", () => {
  console.log("Tarea programada ejecutada con exito");
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
      Motivo,
    } = req.body;
    console.log("Motti:", Motivo);

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
        Motivo,
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
            Turno_Id: req.params.Id_TurnoRutinario,
          },
        });
        console.log("Hollaaa borrando memorando...");

        await OtrosMemorandumModel.destroy({
          where: {
            Referencia_Id: Id_Aprendiz,
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
    logger.error(`Error al actualizar el turno rutinario: ${error}`);
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
    // Obtenemos la fecha de hoy y eliminamos la parte de la hora
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    // Formateamos la fecha en formato de YYYY-MM-DD para usar en la consulta
    const fechaHoy = hoy.toISOString().split("T")[0]; // 'YYYY-MM-DD'

    const turnoRutinarioForAprendiz = await TurnosRutinariosModel.findAll({
      where: {
        Id_Aprendiz: req.params.Id_Aprendiz,
        // Usamos Sequelize.literal para comparar solo las fechas sin horas
        [Op.and]: [
          Sequelize.literal(`DATE(Fec_InicioTurno) >= '${fechaHoy}'`),
          // Sequelize.literal(`DATE(Fec_FinTurno) >= '${fechaHoy}'`)
        ],
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
    // console.log(turnoRutinarioForAprendiz);
    if (turnoRutinarioForAprendiz.length === 0) {
      return res
        .status(404)
        .json({ message: "No tienes turno programado para hoy" });
    }

    res.status(200).json(turnoRutinarioForAprendiz);
  } catch (error) {
    logger.error(
      `Error al obtener los turnos rutinarios para el aprendiz: ${error.message}`
    );
    res.status(500).json({
      message: "Error al obtener los turnos rutinarios para el aprendiz.",
    });
  }
};

import moment from "moment";

export const updateInasistencia = async (req, res) => {
  try {
    const { Id_Aprendiz } = req.params;
    const {
      Ind_Asistencia,
      Turno_Id,
      Fec_Inasistencia,
      Motivo,
      Tipo_Inasistencia,
    } = req.body;

    const aprendiz = await ApprenticeModel.findByPk(Id_Aprendiz);

    if (!aprendiz) {
      return res.status(404).json({ error: "Aprendiz no encontrado" });
    }

    const formattedFecInasistencia =
      moment(Fec_Inasistencia).format("YYYY-MM-DD"); // Normalizar la fecha

    if (Ind_Asistencia === "No") {
      console.log("Entrando al modo incrementar");

      // Incrementar contadores
      aprendiz.Tot_Inasistencias += 1;
      aprendiz.Tot_Memorandos += 1;

      // Crear registro de inasistencia
      await AbsenceModel.create({
        Fec_Inasistencia,
        Mot_Inasistencia: Motivo,
        Turno_Id: Turno_Id,
        Tipo_Inasistencia,
      });
      const inasistencia = await AbsenceModel.findOne({
        where: {
          Turno_Id: Turno_Id,
        },
      });
      // Crear registro de memorando
      await OtrosMemorandumModel.create({
        Fec_OtroMemorando: Fec_Inasistencia,
        Mot_OtroMemorando: Motivo,
        Referencia_Id: inasistencia.Id_Inasistencia,
      });
    } else if (Ind_Asistencia === "Si") {
      console.log("Entrando al modo decrementar");

      // Decrementar contadores si es posible
      if (aprendiz.Tot_Inasistencias > 0) aprendiz.Tot_Inasistencias -= 1;
      if (aprendiz.Tot_Memorandos > 0) aprendiz.Tot_Memorandos -= 1;

      // Buscar y eliminar la inasistencia
      const inasistencia = await AbsenceModel.findOne({
        where: {
          // Fec_Inasistencia: formattedFecInasistencia,
          Turno_Id: Id_Aprendiz,
        },
      });
      console.log("Esta es la inasistencia", inasistencia);

      if (inasistencia) {
      // Buscar y eliminar el memorando
        const memorando = await OtrosMemorandumModel.findOne({
          where: {
            Referencia_Id: inasistencia.Id_Inasistencia,
            // Fec_OtroMemorando: formattedFecInasistencia  // Comparar la fecha formateada sin la hora
          },
        });
        console.log("Este es el memorando", memorando);
        if (memorando) {
          await memorando.destroy();
          console.log("Memorando eliminado");
        } else {
          console.log("No se encontró memorando para eliminar");
        }
        await inasistencia.destroy();
        console.log("Inasistencia eliminada");
      } else {
        console.log("No se encontró inasistencia para eliminar");
      }
    }
    // Guardar los cambios en aprendiz
    await aprendiz.save();
    res
      .status(200)
      .json({ message: "Inasistencia y memorando actualizados exitosamente" });
  } catch (error) {
    console.error(`Error al actualizar inasistencia y memorando: ${error.message}`);
    logger.error(error);
    res
      .status(500)
      .json({ error: "Error al actualizar la inasistencia y memorando" });
  }
};
