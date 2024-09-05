import TurnoEspecialModel from "../models/turnoEspecialModel.js";
import FichasModel from "../models/fichasModel.js";
import UnitModel from "../models/unitModel.js";
import OfficialModel from "../models/officialModel.js";
import { Op } from "sequelize";
import { logger } from "../middleware/logMiddleware.js";

export const getAllTurnosEspeciales = async (req, res) => {
  try {
    // Intento de obtener todos los turnos especiales con las relaciones necesarias.
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
    // Verifico si se encontraron turnos especiales.
    if (turnosEspeciales.length > 0) {
      res.status(200).json(turnosEspeciales);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "No se encontraron turnos especiales.",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la consulta.
    logger.error(`Error al obtener los turnos especiales: ${error.message}`);
    res.status(500).json({
      message: "Error al obtener los turnos especiales.",
    });
  }
};

export const getTurnoEspecial = async (req, res) => {
  try {
    // Intento de obtener un turno especial específico por ID con las relaciones necesarias.
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
    // Verifico si se encontró el turno especial.
    if (turnoEspecial) {
      res.status(200).json(turnoEspecial);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "Turno especial no encontrado",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la consulta.
    logger.error(`Error al obtener el turno especial: ${error.message}`);
    res.status(500).json({
      message: "Error al obtener el turno especial.",
    });
  }
};

export const createTurnoEspecial = async (req, res) => {
  try {
    // Obtengo los datos del cuerpo de la solicitud.
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
    // Manejo la imagen de asistencia si está disponible.
    const Img_Asistencia = req.file ? req.file.filename : null;

    // Intento de crear un nuevo turno especial con los datos proporcionados.
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
    // Verifico si se creó el nuevo turno especial.
    if (newTurnoEspecial) {
      res.status(201).json(newTurnoEspecial);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la creación.
    logger.error(`Error al crear el turno especial: ${error.message}`);
    res.status(500).json({
      message: "Error al crear el turno especial.",
    });
  }
};

export const updateTurnoEspecial = async (req, res) => {
  try {
    // Obtengo los datos del cuerpo de la solicitud.
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

    // Intento de actualizar un turno especial específico por ID.
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
    // Verifico si se realizó alguna actualización.
    if (updated === 0) {
      res.status(404).json({
        message: "Turno especial no encontrado",
      });
    } else {
      res.json({
        message: "Turno especial actualizado correctamente",
      });
      return; // Uso de return para salir de la función después de enviar la respuesta.
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la actualización.
    logger.error(`Error al actualizar el turno especial: ${error.message}`);
    res.status(500).json({
      message: "Error al actualizar el turno especial.",
    });
  }
};

export const deleteTurnoEspecial = async (req, res) => {
  try {
    // Intento de eliminar un turno especial específico por ID.
    const result = await TurnoEspecialModel.destroy({
      where: { Id_TurnoEspecial: req.params.Id_TurnoEspecial },
    });
    // Verifico si se realizó la eliminación.
    if (result === 0) {
      res.status(404).json({
        message: "Turno especial no encontrado",
      });
    } else {
      res.json({
        message: "Turno especial eliminado correctamente",
      });
      return; // Uso de return para salir de la función después de enviar la respuesta.
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la eliminación.
    logger.error(`Error al eliminar el turno especial: ${error.message}`);
    res.status(500).json({
      message: "Error al eliminar el turno especial.",
    });
  }
};

export const getQueryTurnoEspecial = async (req, res) => {
  try {
    // Intento de buscar turnos especiales que coincidan con el ID proporcionado.
    const turnosEspeciales = await TurnoEspecialModel.findAll({
      where: {
        Id_TurnoEspecial: {
          [Op.like]: `%${req.params.Id_TurnoEspecial}%`,
        },
      },
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
    // Verifico si se encontraron turnos especiales.
    if (turnosEspeciales.length > 0) {
      res.status(200).json(turnosEspeciales);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "No se encontraron turnos especiales que coincidan con la búsqueda.",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la búsqueda.
    logger.error(`Error al buscar el turno especial: ${error.message}`);
    res.status(500).json({
      message: "Error al buscar el turno especial.",
    });
  }
};
