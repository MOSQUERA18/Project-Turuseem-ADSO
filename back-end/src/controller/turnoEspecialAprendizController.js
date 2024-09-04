import TurnoEspecialAprendizModel from "../models/turnoEspeciales_Aprendices.js";
import TurnoEspecialModel from "../models/turnoEspecialModel.js";
import ApprenticeModel from "../models/apprenticeModel.js";
import { logger } from "../middleware/logMiddleware.js";

export const getAllTurnosEspecialesAprendices = async (req, res) => {
  try {
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
    if(turnosEspecialesAprendices > 0){
      res.status(200).json(turnosEspecialesAprendices);
      return
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener los turnos especiales de aprendices: ${error}`);
  }
};

export const getTurnoEspecialAprendiz = async (req, res) => {
  try {
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
    if (turnoEspecialAprendiz) {
      res.status(200).json(turnoEspecialAprendiz);
      return
    } else {
      res.status(404).json({ message: "Turno especial de aprendiz no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener el turno especial de aprendiz: ${error}`);
  }
};

export const createTurnoEspecialAprendiz = async (req, res) => {
  try {
    const { Id_TurnoEspecial, Id_Aprendiz } = req.body;

    const newTurnoEspecialAprendiz = await TurnoEspecialAprendizModel.create({
      Id_TurnoEspecial,
      Id_Aprendiz,
    });
    if(newTurnoEspecialAprendiz){
    res.status(201).json(newTurnoEspecialAprendiz);
    return
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al crear el turno especial de aprendiz: ${error}`);
  }
};

export const updateTurnoEspecialAprendiz = async (req, res) => {
  try {
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
    if (updated === 0) {
      res.status(404).json({ message: "Turno especial de aprendiz no encontrado" });
    } else {
      res.json({ message: "Turno especial de aprendiz actualizado correctamente" });
      return
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al actualizar el turno especial de aprendiz: ${error}`);
  }
};

export const deleteTurnoEspecialAprendiz = async (req, res) => {
  try {
    const result = await TurnoEspecialAprendizModel.destroy({
      where: { Id_TurnoEspecialAprendiz: req.params.Id_TurnoEspecialAprendiz },
    });
    if (result === 0) {
      res.status(404).json({ message: "Turno especial de aprendiz no encontrado" });
    } else {
      res.json({ message: "Turno especial de aprendiz eliminado correctamente" });
      return
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al eliminar el turno especial de aprendiz: ${error}`);
  }
};