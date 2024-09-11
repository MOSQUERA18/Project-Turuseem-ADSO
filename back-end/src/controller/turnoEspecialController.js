import TurnoEspecialModel from "../models/turnoEspecialModel.js";
import FichasModel from "../models/fichasModel.js";
import UnitModel from "../models/unitModel.js";
import OfficialModel from "../models/officialModel.js";
import { logger } from "../middleware/logMiddleware.js";

export const getAllTurnosEspeciales = async (req, res) => {
  try {
    const turnosEspeciales = await TurnoEspecialModel.findAll({
      include: [
        {
          model: FichasModel,
          as: "fichas", // Alias usado para la relación
        },
        {
          model: UnitModel,
          as: "unidad", // Alias usado para la relación
        },
        {
          model: OfficialModel,
          as: "funcionario", // Alias usado para la relación
        },
      ],
    });
    if (turnosEspeciales.length > 0) {
      res.status(200).json(turnosEspeciales);
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener los turnos especiales: ${error}`);
  }
};

export const getTurnoEspecial = async (req, res) => {
  try {
    const turnoEspecial = await TurnoEspecialModel.findByPk(
      req.params.Id_TurnoEspecial,
      {
        include: [
          {
            model: FichasModel,
            as: "fichas", // Alias usado para la relación
          },
          {
            model: UnitModel,
            as: "unidad", // Alias usado para la relación
          },
          {
            model: OfficialModel,
            as: "funcionario", // Alias usado para la relación
          },
        ],
      }
    );
    if (turnoEspecial) {
      res.status(200).json(turnoEspecial);
      return;
    } else {
      res.status(404).json({ message: "Turno especial no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener el turno especial: ${error}`);
  }
};

export const createTurnoEspecial = async (req, res) => {
  try {
    const {
      Fec_TurnoEspecial,
      Hor_Inicio,
      Hor_Fin,
      Obs_TurnoEspecial,
      Tot_AprendicesAsistieron,
      Id_Ficha,
      Id_Funcionario,
      Id_Unidad,
    } = req.body;
    const Img_Asistencia = req.file ? req.file.filename : null;

    

    const newTurnoEspecial = await TurnoEspecialModel.create({
      Fec_TurnoEspecial: new Date(Fec_TurnoEspecial).toISOString().split('T')[0],
      Hor_Inicio,
      Hor_Fin,
      Obs_TurnoEspecial,
      Tot_AprendicesAsistieron,
      Id_Ficha,
      Img_Asistencia,
      Id_Funcionario,
      Id_Unidad,
    });
    if (newTurnoEspecial) {
      res.status(201).json(newTurnoEspecial);
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al crear el turno especial: ${error}`);
  }
};

export const updateTurnoEspecial = async (req, res) => {
  try {
    const {
      Fec_TurnoEspecial,
      Hor_Inicio,
      Hor_Fin,
      Obs_TurnoEspecial,
      Tot_AprendicesAsistieron,
      Id_Ficha,
      Img_Asistencia,
      Id_Funcionario,
      Id_Unidad,
    } = req.body;

    const [updated] = await TurnoEspecialModel.update(
      {
        Fec_TurnoEspecial: new Date(Fec_TurnoEspecial).toISOString().split('T')[0],
        Hor_Inicio,
        Hor_Fin,
        Obs_TurnoEspecial,
        Tot_AprendicesAsistieron,
        Id_Ficha,
        Img_Asistencia,
        Id_Funcionario,
        Id_Unidad,
      },
      {
        where: { Id_TurnoEspecial: req.params.Id_TurnoEspecial },
      }
    );
    if (updated === 0) {
      res.status(404).json({ message: "Turno especial no encontrado" });
    } else {
      res.json({ message: "Turno especial actualizado correctamente" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al actualizar el turno especial: ${error}`);
  }
};

export const deleteTurnoEspecial = async (req, res) => {
  try {
    const result = await TurnoEspecialModel.destroy({
      where: { Id_TurnoEspecial: req.params.Id_TurnoEspecial },
    });
    if (result === 0) {
      res.status(404).json({ message: "Turno especial no encontrado" });
    } else {
      res.json({ message: "Turno especial eliminado correctamente" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al eliminar el turno especial: ${error}`);
  }
};

export const getTurnoEspecialForFichas = async (req, res) => {
  try {
    const turnoEspecialForAprendiz = await TurnoEspecialModel.findAll({
      where: { Id_Ficha : req.params.Id_Ficha },
      include: [
        {
          model: FichasModel,
          as: "fichas",
        },
        {
          model: UnitModel,
          as: "unidad",
        },
        {
          model: OfficialModel,
          as: "funcionario",
        },
      ],
    });

    if (turnoEspecialForAprendiz.length === 0) {
      res.status(404).json({ message: "La ficha no esta Programada Para Turno" });
      return;
    }
    res.status(200).json(turnoEspecialForAprendiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener el turno programado: ${error}`);
  }
};
