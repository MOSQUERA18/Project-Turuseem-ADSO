import FichasModel from "../models/fichasModel.js";
import ProgramaModel from "../models/programaModel.js";
import { Sequelize, Op } from "sequelize";
import { logger } from "../middleware/logMiddleware.js";

export const getAllFichas = async (req, res) => {
  try {
    const Fichas = await FichasModel.findAll({
      include: [
        {
          model: ProgramaModel,
          as: "programa", // Alias usado para la relación
        },
      ],
    });
    res.json(Fichas);
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener las fichas: ${error}`);
  }
};

export const getFicha = async (req, res) => {
  try {
    const Ficha = await FichasModel.findByPk(req.params.Id_Ficha, {
      include: [
        {
          model: ProgramaModel,
          as: "programa", // Alias usado para la relación
        },
      ],
    });
    if (Ficha) {
      res.json(Ficha);
    } else {
      res.status(404).json({ message: "Ficha no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener la ficha: ${error}`);
  }
};

export const createFicha = async (req, res) => {
  try {
    const {
      Id_Ficha,
      Fec_InicioEtapaLectiva,
      Fec_FinEtapaLectiva,
      Fec_FinEtapaProductiva,
      Can_Aprendices,
      Id_ProgramaFormacion,
      Estado,
    } = req.body;
    const NewFicha = await FichasModel.create({
      Id_Ficha,
      Fec_InicioEtapaLectiva,
      Fec_FinEtapaLectiva,
      Fec_FinEtapaProductiva,
      Can_Aprendices,
      Id_ProgramaFormacion,
      Estado,
    });
    res.status(201).json(NewFicha);
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al crear la ficha: ${error}`);
  }
};

export const updateFicha = async (req, res) => {
  try {
    const {
      Fec_InicioEtapaLectiva,
      Fec_FinEtapaLectiva,
      Fec_FinEtapaProductiva,
      Can_Aprendices,
      Id_ProgramaFormacion,
      Estado,
    } = req.body;
    const [updated] = await FichasModel.update(
      {
        Fec_InicioEtapaLectiva,
        Fec_FinEtapaLectiva,
        Fec_FinEtapaProductiva,
        Can_Aprendices,
        Id_ProgramaFormacion,
        Estado,
      },
      {
        where: { Id_Ficha: req.params.Id_Ficha },
      }
    );
    if (updated === 0) {
      res.status(404).json({ message: "Ficha no encontrada" });
    } else {
      res.json({ message: "Ficha actualizada correctamente" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al actualizar la ficha: ${error}`);
  }
};

export const deleteFicha = async (req, res) => {
  try {
    const Result = await FichasModel.destroy({
      where: { Id_Ficha: req.params.Id_Ficha },
    });
    if (Result === 0) {
      res.status(404).json({ message: "Ficha no encontrada" });
    } else {
      res.json({ message: "Ficha eliminada correctamente" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al eliminar la ficha: ${error}`);
  }
};

export const getQueryFicha = async (req, res) => {
  try {
    const Fichas = await FichasModel.findAll({
      where: {
        Id_Ficha: {
          [Op.like]: `%${req.params.Id_Ficha}%`,
        },
      },
      include: [
        {
          model: ProgramaModel,
          as: "programa", // Alias usado para la relación
        },
      ],
    });
    res.json(Fichas);
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al buscar la ficha: ${error}`);
  }
};
