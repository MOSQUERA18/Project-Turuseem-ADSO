import AbsenceModel from "../models/absenceModel.js";
import TurnoRutinarioModel from "../models/turnoRutinarioModel.js";
import { logger } from "../middleware/logMiddleware.js";
import TurnosRutinariosModel from "../models/turnoRutinarioModel.js";
import ApprenticeModel from "../models/apprenticeModel.js";
import UnitModel from "../models/unitModel.js";

export const getAllAbsences = async (req, res) => {
  try {
    const inasistencias = await AbsenceModel.findAll({
      include: [
        {
          model: TurnoRutinarioModel,
          as: "turnorutinario", // Alias usado para la relación
          include: [
            {
              model: ApprenticeModel,
              as: "aprendiz", // Alias para la relación con Aprendiz
            },
            {
              model: UnitModel,
              as: "unidad", // Alias para la relación con Unidad
            },
          ],
        },
      ],
    });

    if (inasistencias) {
      res.status(200).json(inasistencias); //a todos los controllers toca agg esto para validar los datos
      return;
    } else {
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
            model: TurnoRutinarioModel,
            as: "turnorutinario", // Alias usado para la relación
            include: [
              {
                model: ApprenticeModel,
                as: "aprendiz", // Alias para la relación con Aprendiz
              },
              {
                model: UnitModel,
                as: "unidad", // Alias para la relación con Unidad
              },
            ],
          },
        ],
      }
    );

    if (inasistencia) {
      res.status(200).json(inasistencia);
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
    const { Fec_Inasistencia, Mot_Inasistencia, Id_TurnoRutinario } = req.body;

    const newInasistencia = await AbsenceModel.create({
      Fec_Inasistencia,
      Mot_Inasistencia,
      Id_TurnoRutinario,
    });
    if (newInasistencia) {
      res.status(201).json(newInasistencia);
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al crear la inasistencia: ${error}`);
  }
};

export const updateAbsence = async (req, res) => {
  try {
    const { Fec_Inasistencia, Mot_Inasistencia, Id_TurnoRutinario } = req.body;

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
    if (updated === 0) {
      res.status(404).json({ message: "Inasistencia no encontrada" });
    } else {
      res.json({ message: "Inasistencia actualizada correctamente" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al actualizar la inasistencia: ${error}`);
  }
};



export const deleteAbsence = async (req, res) => {
  try {
    const { Id_TurnoRutinario } = req.params;

    // Asegúrate de que Id_TurnoRutinario no sea undefined o null
    if (!Id_TurnoRutinario) {
      return res.status(400).json({ message: "Id_TurnoRutinario es requerido" });
    }

    const result = await AbsenceModel.destroy({
      where: { Id_TurnoRutinario: Id_TurnoRutinario },
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
