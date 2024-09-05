import AbsenceModel from "../models/absenceModel.js";
import TurnoRutinarioModel from "../models/turnoRutinarioModel.js";
import { logger } from "../middleware/logMiddleware.js";
import ApprenticeModel from "../models/apprenticeModel.js";
import UnitModel from "../models/unitModel.js";

// Obtener todas las inasistencias
export const getAllAbsences = async (req, res) => {
  try {
    // Se busca todas las inasistencias en la base de datos con sus relaciones
    const inasistencias = await AbsenceModel.findAll({
      include: [
        {
          model: TurnoRutinarioModel,
          as: "turnorutinario",
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
        },
      ],
    });

    // Si se encuentran inasistencias, se retornan con un código 200
    if (inasistencias) {
      return res.status(200).json(inasistencias);
    } else {
      // Si no se encuentran inasistencias, se retorna un código 404 con un mensaje
      return res.status(404).json({
        message: "No se encontraron inasistencias.",
      });
    }
  } catch (error) {
    // Manejo de errores y registro en logs
    logger.error(`Error al obtener las inasistencias: ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

// Obtener una inasistencia específica por ID
export const getAbsence = async (req, res) => {
  try {
    // Se busca una inasistencia por su ID
    const inasistencia = await AbsenceModel.findByPk(req.params.Id_Inasistencia, {
      include: [
        {
          model: TurnoRutinarioModel,
          as: "turnorutinario",
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
        },
      ],
    });

    // Si se encuentra la inasistencia, se retorna con un código 200
    if (inasistencia) {
      return res.status(200).json(inasistencia);
    } else {
      // Si no se encuentra la inasistencia, se retorna un código 404 con un mensaje
      return res.status(404).json({ message: "Inasistencia no encontrada" });
    }
  } catch (error) {
    // Manejo de errores y registro en logs
    logger.error(`Error al obtener la inasistencia: ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

// Crear una nueva inasistencia
export const createAbsence = async (req, res) => {
  try {
    const { Fec_Inasistencia, Mot_Inasistencia, Id_TurnoRutinario } = req.body;

    // Se crea una nueva inasistencia con los datos proporcionados
    const newInasistencia = await AbsenceModel.create({
      Fec_Inasistencia,
      Mot_Inasistencia,
      Id_TurnoRutinario,
    });

    // Si la inasistencia se crea con éxito, se retorna con un código 201
    if (newInasistencia) {
      return res.status(201).json(newInasistencia);
    }
  } catch (error) {
    // Manejo de errores y registro en logs
    logger.error(`Error al crear la inasistencia: ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar una inasistencia existente
export const updateAbsence = async (req, res) => {
  try {
    const { Fec_Inasistencia, Mot_Inasistencia, Id_TurnoRutinario } = req.body;

    // Se intenta actualizar la inasistencia con el ID especificado
    const [updated] = await AbsenceModel.update(
      {
        Fec_Inasistencia,
        Mot_Inasistencia,
        Id_TurnoRutinario,
      },
      {
        where: { Id_Inasistencia: req.params.Id_Inasistencia },
      }
    );

    // Si no se actualiza ninguna fila, significa que no se encontró la inasistencia
    if (updated === 0) {
      return res.status(404).json({ message: "Inasistencia no encontrada" });
    } else {
      // Si la actualización es exitosa, se retorna un mensaje de éxito
      return res.json({ message: "Inasistencia actualizada correctamente" });
    }
  } catch (error) {
    // Manejo de errores y registro en logs
    logger.error(`Error al actualizar la inasistencia: ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

const {Id_TurnoRutinario} = TurnoRutinarioModel;

export const deleteAbsence = async (req, res) => {
  try {
    // Se intenta eliminar la inasistencia basada en el ID de TurnoRutinario
    const result = await AbsenceModel.destroy({
      where: { Id_TurnoRutinario: req.params.Id_TurnoRutinario },
    });

    // Si no se elimina ninguna fila, significa que no se encontró la inasistencia
    if (result === 0) {
      return res.status(404).json({ message: "Inasistencia no encontrada" });
    } else {
      // Si la eliminación es exitosa, se retorna un mensaje de éxito
      return res.json({ message: "Inasistencia eliminada correctamente" });
    }
  } catch (error) {
    // Manejo de errores y registro en logs
    logger.error(`Error al eliminar la inasistencia: ${error}`);
    return res.status(500).json({ message: error.message });
  }
};
