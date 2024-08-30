import TurnosRutinariosModel from "../models/turnoRutinarioModel.js";
import ApprenticeModel from "../models/apprenticeModel.js";
import UnitModel from "../models/unitModel.js";
import { Sequelize, Op } from "sequelize";
import { logger } from "../middleware/logMiddleware.js";

export const getAllTurnosRutinarios = async (req, res) => {
  try {
    const turnosRutinarios = await TurnosRutinariosModel.findAll({
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
    if (turnosRutinarios) {
      res.status(200).json(turnosRutinarios);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener los turnos rutinarios: ${error}`);
  }
};

export const getTurnoRutinario = async (req, res) => {
  try {
    const turnoRutinario = await TurnosRutinariosModel.findByPk(
      req.params.Id_TurnoRutinario,
      {
        include: [
          {
            model: ApprenticeModel,
            as: "aprendiz", // Alias usado para la relación
          },
          {
            model: UnitModel,
            as: "unidad", // Alias usado para la relación
          },
        ],
      }
    );
    if (turnoRutinario) {
      res.status(200).json(turnoRutinario);
      return;
    } else {
      res.status(404).json({ message: "Turno rutinario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener el turno rutinario: ${error}`);
  }
};

export const createTurnoRutinario = async (req, res) => {
  try {
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
    if (newTurnoRutinario) {
      res.status(201).json(newTurnoRutinario);
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al crear el turno rutinario: ${error}`);
  }
};

export const updateTurnoRutinario = async (req, res) => {
  try {
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
    if (updated === 0) {
      res.status(404).json({ message: "Turno rutinario no encontrado" });
    } else {
      res.json({ message: "Turno rutinario actualizado correctamente" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al actualizar el turno rutinario: ${error}`);
  }
};

export const deleteTurnoRutinario = async (req, res) => {
  try {
    const result = await TurnosRutinariosModel.destroy({
      where: { Id_TurnoRutinario: req.params.Id_TurnoRutinario },
    });
    if (result === 0) {
      res.status(404).json({ message: "Turno rutinario no encontrado" });
    } else {
      res.json({ message: "Turno rutinario eliminado correctamente" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al eliminar el turno rutinario: ${error}`);
  }
};

export const getQueryTurnoRutinario = async (req, res) => {
  try {
    const turnosRutinarios = await TurnosRutinariosModel.findAll({
      where: {
        Id_TurnoRutinario: {
          [Op.like]: `%${req.params.Id_TurnoRutinario}%`,
        },
      },
      include: [
        {
          model: ApprenticeModel,
          as: "aprendiz", // Alias usado para la relación
        },
        {
          model: UnitModel,
          as: "unidad", // Alias usado para la relación
        },
      ],
    });
    if (turnosRutinarios) {
      res.status(200).json(turnosRutinarios);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al buscar el turno rutinario: ${error}`);
  }
};

export const getTurnoRutinariosForAprendiz = async (req, res) => {
  try {
    const turnoRutinarioForAprendiz = await TurnosRutinariosModel.findAll({
      where: { Id_Aprendiz: req.params.Id_Aprendiz },
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
      res.status(404).json({ message: "No se encontraron turnos" });
      return;
    }

    res.status(200).json(turnoRutinarioForAprendiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener el turno programado: ${error}`);
  }
};