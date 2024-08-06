import ProgramaModel from "../models/programaModel.js";
import AreaModel from "../models/areaModel.js";
import { Sequelize, Op } from "sequelize";
import { logger } from "../middleware/logMiddleware.js";

export const getAllProgramas = async (req, res) => {
  try {
    const Programas = await ProgramaModel.findAll({
      include: [
        {
          model: AreaModel,
          as: "area", // Alias usado para la relación
        },
      ],
    });
    res.json(Programas);
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener los programas: ${error}`);
  }
};

export const getPrograma = async (req, res) => {
  try {
    const Programa = await ProgramaModel.findByPk(
      req.params.Id_ProgramaFormacion,
      {
        include: [
          {
            model: AreaModel,
            as: "area", // Alias usado para la relación
          },
        ],
      }
    );
    if (Programa) {
      res.json(Programa);
    } else {
      res.status(404).json({ message: "Programa no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener el programa: ${error}`);
  }
};

export const createPrograma = async (req, res) => {
  try {
    const { Nom_ProgramaFormacion, Tip_ProgramaFormacion, Id_Area } = req.body;
    const NewPrograma = await ProgramaModel.create({
      Nom_ProgramaFormacion,
      Tip_ProgramaFormacion,
      Id_Area,
    });
    res.status(201).json(NewPrograma);
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al crear el programa: ${error}`);
  }
};

export const updatePrograma = async (req, res) => {
  try {
    const { Nom_ProgramaFormacion, Tip_ProgramaFormacion, Id_Area } = req.body;
    const [updated] = await ProgramaModel.update(
      {
        Nom_ProgramaFormacion,
        Tip_ProgramaFormacion,
        Id_Area,
      },
      {
        where: { Id_ProgramaFormacion: req.params.Id_ProgramaFormacion },
      }
    );
    if (updated === 0) {
      res.status(404).json({ message: "Programa no encontrado" });
    } else {
      res.json({ message: "Programa actualizado correctamente" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al actualizar el programa: ${error}`);
  }
};

export const deletePrograma = async (req, res) => {
  try {
    const Result = await ProgramaModel.destroy({
      where: { Id_ProgramaFormacion: req.params.Id_ProgramaFormacion },
    });
    if (Result === 0) {
      res.status(404).json({ message: "Programa no encontrado" });
    } else {
      res.json({ message: "Programa eliminado correctamente" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al eliminar el programa: ${error}`);
  }
};

export const getQueryPrograma = async (req, res) => {
  try {
    const Programas = await ProgramaModel.findAll({
      where: {
        Id_ProgramaFormacion: {
          [Op.like]: `%${req.params.Id_ProgramaFormacion}%`,
        },
      },
      include: [
        {
          model: AreaModel,
          as: "area", // Alias usado para la relación
        },
      ],
    });
    res.json(Programas);
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al buscar el programa: ${error}`);
  }
};
