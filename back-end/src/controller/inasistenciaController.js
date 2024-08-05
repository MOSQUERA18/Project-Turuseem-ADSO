import AbsenceModel from "../models/absenceModel.js";
import TurnoRutinarioModel from "../models/turnoRutinarioModel.js";
import TurnoEspecialModel from "../models/turnoEspecialModel.js";
import { Sequelize, Op } from "sequelize";
import { logger } from "../middleware/logMiddleware.js";

export const getAllInasistencias = async (req, res) => {
  try {
    const inasistencias = await AbsenceModel.findAll({
      include: [
        {
          model: TurnoRutinarioModel,
          as: "turnoRutinario", // Alias usado para la relación
        },
        {
          model: TurnoEspecialModel,
          as: "turnoEspecial", // Alias usado para la relación
        },
      ],
    });
    res.json(inasistencias);
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener las inasistencias: ${error}`);
  }
};

export const getInasistencia = async (req, res) => {
  try {
    const inasistencia = await AbsenceModel.findByPk(req.params.Id_Inasistencia, {
      include: [
        {
          model: TurnoRutinarioModel,
          as: "turnoRutinario", // Alias usado para la relación
        },
        {
          model: TurnoEspecialModel,
          as: "turnoEspecial", // Alias usado para la relación
        },
      ],
    });
    if (inasistencia) {
      res.json(inasistencia);
    } else {
      res.status(404).json({ message: "Inasistencia no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener la inasistencia: ${error}`);
  }
};

export const createInasistencia = async (req, res) => {
  try {
    const { Fec_Inasistencia, Mot_Inasistencia, Id_TurnoRutinario_Aprendiz, Id_TurnoEspecial_Aprendiz } = req.body;

    const newInasistencia = await AbsenceModel.create({
      Fec_Inasistencia,
      Mot_Inasistencia,
      Id_TurnoRutinario_Aprendiz,
      Id_TurnoEspecial_Aprendiz,
    });
    res.status(201).json(newInasistencia);
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al crear la inasistencia: ${error}`);
  }
};

export const updateInasistencia = async (req, res) => {
  try {
    const { Fec_Inasistencia, Mot_Inasistencia, Id_TurnoRutinario_Aprendiz, Id_TurnoEspecial_Aprendiz } = req.body;

    const [updated] = await AbsenceModel.update(
      {
        Fec_Inasistencia,
        Mot_Inasistencia,
        Id_TurnoRutinario_Aprendiz,
        Id_TurnoEspecial_Aprendiz,
      },
      {
        where: { Id_Inasistencia: req.params.Id_Inasistencia },
      }
    );
    if (updated === 0) {
      res.status(404).json({ message: "Inasistencia no encontrada" });
    } else {
      res.json({ message: "Inasistencia actualizada correctamente" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al actualizar la inasistencia: ${error}`);
  }
};

export const deleteInasistencia = async (req, res) => {
  try {
    const result = await AbsenceModel.destroy({
      where: { Id_Inasistencia: req.params.Id_Inasistencia },
    });
    if (result === 0) {
      res.status(404).json({ message: "Inasistencia no encontrada" });
    } else {
      res.json({ message: "Inasistencia eliminada correctamente" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al eliminar la inasistencia: ${error}`);
  }
};

export const getQueryInasistencia = async (req, res) => {
  try {
    const inasistencias = await AbsenceModel.findAll({
      where: {
        Id_Inasistencia: {
          [Op.like]: `%${req.params.Id_Inasistencia}%`,
        },
      },
      include: [
        {
          model: TurnoRutinarioModel,
          as: "turnoRutinario", // Alias usado para la relación
        },
        {
          model: TurnoEspecialModel,
          as: "turnoEspecial", // Alias usado para la relación
        },
      ],
    });
    res.json(inasistencias);
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al buscar la inasistencia: ${error}`);
  }
};
