import TurnoEspecialAprendizModel from "../models/turnoEspeciales_Aprendices.js";
import TurnoEspecialModel from "../models/turnoEspecialModel.js";
import ApprenticeModel from "../models/apprenticeModel.js";
import { Sequelize, Op } from "sequelize";
import { logger } from "../middleware/logMiddleware.js";

export const getAllTurnosEspecialesAprendices = async (req, res) => {
  try {
    // Intento de obtener todos los turnos especiales de aprendices con las relaciones necesarias.
    const turnosEspecialesAprendices = await TurnoEspecialAprendizModel.findAll({
      include: [
        {
          model: TurnoEspecialModel,
          as: "turnoEspecial", // Alias usado para la relación
        },
        {
          model: ApprenticeModel,
          as: "aprendiz", // Alias usado para la relación
        },
      ],
    });
    // Verifico si se encontraron turnos especiales de aprendices.
    if (turnosEspecialesAprendices.length > 0) {
      res.status(200).json(turnosEspecialesAprendices);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "No se encontraron turnos especiales de aprendices.",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la consulta.
    logger.error(`Error al obtener los turnos especiales de aprendices: ${error.message}`);
    res.status(500).json({
      message: "Error al obtener los turnos especiales de aprendices.",
    });
  }
};

export const getTurnoEspecialAprendiz = async (req, res) => {
  try {
    // Intento de obtener un turno especial de aprendiz específico por ID con las relaciones necesarias.
    const turnoEspecialAprendiz = await TurnoEspecialAprendizModel.findByPk(req.params.Id_TurnoEspecialAprendiz, {
      include: [
        {
          model: TurnoEspecialModel,
          as: "turnoEspecial", // Alias usado para la relación
        },
        {
          model: ApprenticeModel,
          as: "aprendiz", // Alias usado para la relación
        },
      ],
    });
    // Verifico si se encontró el turno especial de aprendiz.
    if (turnoEspecialAprendiz) {
      res.status(200).json(turnoEspecialAprendiz);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "Turno especial de aprendiz no encontrado",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la consulta.
    logger.error(`Error al obtener el turno especial de aprendiz: ${error.message}`);
    res.status(500).json({
      message: "Error al obtener el turno especial de aprendiz.",
    });
  }
};

export const createTurnoEspecialAprendiz = async (req, res) => {
  try {
    // Intento de crear un nuevo turno especial de aprendiz con los datos proporcionados.
    const { Id_TurnoEspecial, Id_Aprendiz } = req.body;
    const newTurnoEspecialAprendiz = await TurnoEspecialAprendizModel.create({
      Id_TurnoEspecial,
      Id_Aprendiz,
    });
    // Verifico si se creó el nuevo turno especial de aprendiz.
    if (newTurnoEspecialAprendiz) {
      res.status(201).json(newTurnoEspecialAprendiz);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la creación.
    logger.error(`Error al crear el turno especial de aprendiz: ${error.message}`);
    res.status(500).json({
      message: "Error al crear el turno especial de aprendiz.",
    });
  }
};

export const updateTurnoEspecialAprendiz = async (req, res) => {
  try {
    // Intento de actualizar un turno especial de aprendiz específico por ID.
    const { Id_TurnoEspecial, Id_Aprendiz } = req.body;
    const [updated] = await TurnoEspecialAprendizModel.update(
      {
        Id_TurnoEspecial,
        Id_Aprendiz,
      },
      {
        where: { Id_TurnoEspecialAprendiz: req.params.Id_TurnoEspecialAprendiz },
      }
    );
    // Verifico si se realizó alguna actualización.
    if (updated === 0) {
      res.status(404).json({
        message: "Turno especial de aprendiz no encontrado",
      });
    } else {
      res.json({
        message: "Turno especial de aprendiz actualizado correctamente",
      });
      return; // Uso de return para salir de la función después de enviar la respuesta.
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la actualización.
    logger.error(`Error al actualizar el turno especial de aprendiz: ${error.message}`);
    res.status(500).json({
      message: "Error al actualizar el turno especial de aprendiz.",
    });
  }
};

export const deleteTurnoEspecialAprendiz = async (req, res) => {
  try {
    // Intento de eliminar un turno especial de aprendiz específico por ID.
    const result = await TurnoEspecialAprendizModel.destroy({
      where: { Id_TurnoEspecialAprendiz: req.params.Id_TurnoEspecialAprendiz },
    });
    // Verifico si se realizó la eliminación.
    if (result === 0) {
      res.status(404).json({
        message: "Turno especial de aprendiz no encontrado",
      });
    } else {
      res.json({
        message: "Turno especial de aprendiz eliminado correctamente",
      });
      return; // Uso de return para salir de la función después de enviar la respuesta.
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la eliminación.
    logger.error(`Error al eliminar el turno especial de aprendiz: ${error.message}`);
    res.status(500).json({
      message: "Error al eliminar el turno especial de aprendiz.",
    });
  }
};

export const getQueryTurnoEspecialAprendiz = async (req, res) => {
  try {
    // Intento de buscar turnos especiales de aprendices que coincidan con el ID proporcionado.
    const turnosEspecialesAprendices = await TurnoEspecialAprendizModel.findAll({
      where: {
        Id_TurnoEspecialAprendiz: {
          [Op.like]: `%${req.params.Id_TurnoEspecialAprendiz}%`,
        },
      },
      include: [
        {
          model: TurnoEspecialModel,
          as: "turnoEspecial", // Alias usado para la relación
        },
        {
          model: ApprenticeModel,
          as: "aprendiz", // Alias usado para la relación
        },
      ],
    });
    // Verifico si se encontraron turnos especiales de aprendices.
    if (turnosEspecialesAprendices.length > 0) {
      res.status(200).json(turnosEspecialesAprendices);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "No se encontraron turnos especiales de aprendices que coincidan con la búsqueda.",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la búsqueda.
    logger.error(`Error al buscar el turno especial de aprendiz: ${error.message}`);
    res.status(500).json({
      message: "Error al buscar el turno especial de aprendiz.",
    });
  }
};
