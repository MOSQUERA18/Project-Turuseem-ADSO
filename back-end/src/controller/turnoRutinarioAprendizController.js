import TurnoRutinarioAprendizModel from "../models/turnoRutinarioAprendices.js";
import TurnoRutinarioModel from "../models/turnoRutinarioModel.js";
import ApprenticeModel from "../models/apprenticeModel.js";
import { Sequelize, Op } from "sequelize";
import { logger } from "../middleware/logMiddleware.js";

export const getAllTurnosRutinariosAprendices = async (req, res) => {
  try {
    const turnosRutinariosAprendices = await TurnoRutinarioAprendizModel.findAll({
      include: [
        {
          model: TurnoRutinarioModel,
          as: "turnoRutinario", // Alias usado para la relación
        },
        {
          model: ApprenticeModel,
          as: "aprendiz", // Alias usado para la relación
        },
      ],
    });
    res.json(turnosRutinariosAprendices);
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener los turnos rutinarios de aprendices: ${error}`);
  }
};

export const getTurnoRutinarioAprendiz = async (req, res) => {
  try {
    const turnoRutinarioAprendiz = await TurnoRutinarioAprendizModel.findByPk(req.params.Id_TurnoRutinarioAprendiz, {
      include: [
        {
          model: TurnoRutinarioModel,
          as: "turnoRutinario", // Alias usado para la relación
        },
        {
          model: ApprenticeModel,
          as: "aprendiz", // Alias usado para la relación
        },
      ],
    });
    if (turnoRutinarioAprendiz) {
      res.json(turnoRutinarioAprendiz);
    } else {
      res.status(404).json({ message: "Turno rutinario de aprendiz no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener el turno rutinario de aprendiz: ${error}`);
  }
};

export const createTurnoRutinarioAprendiz = async (req, res) => {
  try {
    const { Id_TurnoRutinario, Id_Aprendiz } = req.body;

    const newTurnoRutinarioAprendiz = await TurnoRutinarioAprendizModel.create({
      Id_TurnoRutinario,
      Id_Aprendiz,
    });
    res.status(201).json(newTurnoRutinarioAprendiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al crear el turno rutinario de aprendiz: ${error}`);
  }
};

export const updateTurnoRutinarioAprendiz = async (req, res) => {
  try {
    const { Id_TurnoRutinario, Id_Aprendiz } = req.body;

    const [updated] = await TurnoRutinarioAprendizModel.update(
      {
        Id_TurnoRutinario,
        Id_Aprendiz,
      },
      {
        where: { Id_TurnoRutinarioAprendiz: req.params.Id_TurnoRutinarioAprendiz },
      }
    );
    if (updated === 0) {
      res.status(404).json({ message: "Turno rutinario de aprendiz no encontrado" });
    } else {
      res.json({ message: "Turno rutinario de aprendiz actualizado correctamente" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al actualizar el turno rutinario de aprendiz: ${error}`);
  }
};

export const deleteTurnoRutinarioAprendiz = async (req, res) => {
  try {
    const result = await TurnoRutinarioAprendizModel.destroy({
      where: { Id_TurnoRutinarioAprendiz: req.params.Id_TurnoRutinarioAprendiz },
    });
    if (result === 0) {
      res.status(404).json({ message: "Turno rutinario de aprendiz no encontrado" });
    } else {
      res.json({ message: "Turno rutinario de aprendiz eliminado correctamente" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al eliminar el turno rutinario de aprendiz: ${error}`);
  }
};

export const getQueryTurnoRutinarioAprendiz = async (req, res) => {
  try {
    const turnosRutinariosAprendices = await TurnoRutinarioAprendizModel.findAll({
      where: {
        Id_TurnoRutinarioAprendiz: {
          [Op.like]: `%${req.params.Id_TurnoRutinarioAprendiz}%`,
        },
      },
      include: [
        {
          model: TurnoRutinarioModel,
          as: "turnoRutinario", // Alias usado para la relación
        },
        {
          model: ApprenticeModel,
          as: "aprendiz", // Alias usado para la relación
        },
      ],
    });
    res.json(turnosRutinariosAprendices);
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al buscar el turno rutinario de aprendiz: ${error}`);
  }
};
