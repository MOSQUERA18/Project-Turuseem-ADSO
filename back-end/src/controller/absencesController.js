import AbsenceModel from "../models/absenceModel.js";
import TurnoRutinarioModel from "../models/turnoRutinarioModel.js";
import TurnoRutinarioAprendizModel from "../models/turnoRutinarioAprendices.js";
import TurnoEspecialAprendizModel from "../models/turnoEspeciales_Aprendices.js";
import TurnoEspecialModel from "../models/turnoEspecialModel.js";
import { Op } from "sequelize";
import { logger } from "../middleware/logMiddleware.js";

export const getAllAbsences = async (req, res) => {
  try {
    const inasistencias = await AbsenceModel.findAll({
      include: [
        {
          model: TurnoRutinarioAprendizModel,
          as: "turnoRutinarioAprendiz", // Alias usado para la relación
        },
        {
          model: TurnoEspecialAprendizModel,
          as: "turnoEspecialAprendiz", // Alias usado para la relación
        },
      ],
    });
    if(inasistencias.length>0){
      res.json(200).json(inasistencias); //a todos los controllers toca agg esto para validar los datos
      return
    }else {
      res.status(404).json({
        message: "No se encontraron inasistencias.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener las inasistencias: ${error}`);
  }
};

export const getAbsence = async (req, res) => {
  try {
    const inasistencia = await AbsenceModel.findByPk(
      req.params.Id_Inasistencia,
      {
        include: [
          {
            model: TurnoRutinarioAprendizModel,
            as: "turnoRutinarioApreniz", // Alias usado para la relación
          },
          {
            model: TurnoEspecialModel,
            as: "turnoEspecial", // Alias usado para la relación
          },
        ],
      }
    );
    if (inasistencia.length>0) {
      res.status(200).json(inasistencia);
      return
    } else {
      res.status(404).json({ message: "Inasistencia no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener la inasistencia: ${error}`);
  }
};

export const createAbsence = async (req, res) => {
  try {
    const {
      Fec_Inasistencia,
      Mot_Inasistencia,
      Id_TurnoRutinario_Aprendiz,
      Id_TurnoEspecial_Aprendiz,
    } = req.body;

    const newInasistencia = await AbsenceModel.create({
      Fec_Inasistencia,
      Mot_Inasistencia,
      Id_TurnoRutinario_Aprendiz,
      Id_TurnoEspecial_Aprendiz,
    });
    if(newInasistencia){
      res.status(201).json(newInasistencia);
      return
    }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al crear la inasistencia: ${error}`);
  }
};

export const updateAbsence = async (req, res) => {
  try {
    const {
      Fec_Inasistencia,
      Mot_Inasistencia,
      Id_TurnoRutinario_Aprendiz,
      Id_TurnoEspecial_Aprendiz,
    } = req.body;

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
      return
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al actualizar la inasistencia: ${error}`);
  }
};

export const deleteAbsence = async (req, res) => {
  try {
    const result = await AbsenceModel.destroy({
      where: { Id_Inasistencia: req.params.Id_Inasistencia },
    });
    if (result === 0) {
      res.status(404).json({ message: "Inasistencia no encontrada" });
      
    } else {
      res.json({ message: "Inasistencia eliminada correctamente" });
      return
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
    if(inasistencias.length > 0){
      res.status(200).json(inasistencias);
      return
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al buscar la inasistencia: ${error}`);
  }
};
