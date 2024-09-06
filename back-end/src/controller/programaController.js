import ProgramaModel from "../models/programaModel.js";
import AreaModel from "../models/areaModel.js";
import { logger } from "../middleware/logMiddleware.js";

export const getAllProgramas = async (req, res) => {
  try {
    const Programas = await ProgramaModel.findAll({
      include: [
        {
          model: AreaModel,
          as: "areas", // Alias usado para la relación
        },
      ],
    });
    if(Programas.length>0){
      res.status(200).json(Programas);
    }
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
            as: "areas", // Alias usado para la relación
          },
        ],
      }
    );
    if (Programa) {
      res.status(200).json(Programa);
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
    const {Id_ProgramaFormacion, Nom_ProgramaFormacion, Tip_ProgramaFormacion, Id_Area } = req.body;
    const NewPrograma = await ProgramaModel.create({
      Id_ProgramaFormacion,
      Nom_ProgramaFormacion,
      Tip_ProgramaFormacion,
      Id_Area,
    });
    if(NewPrograma){
      res.status(200).json(NewPrograma);
      return
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al crear el programa: ${error}`);
  }
};

export const updatePrograma = async (req, res) => {
  try {
    const {Id_ProgramaFormacion, Nom_ProgramaFormacion, Tip_ProgramaFormacion, Id_Area } = req.body;
    const [updated] = await ProgramaModel.update(
      {
        Id_ProgramaFormacion,
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
      return
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al actualizar el programa: ${error}`);
  }
};

export const deletePrograma = async (req, res) => {
  try {
    const deleted = await ProgramaModel.destroy({
      where: { Id_ProgramaFormacion: req.params.Id_ProgramaFormacion },
    });
    if (deleted) {
      res.json({
        message: "Programa borrado correctamente!", //a todos los controllers toca agg esto para validar los datos
      });
      return
    } else {
      res.status(404).json({
        message: "Programa no encontrado.",
      });
    }
  } catch (error) {
    logger.error("Error deleting Programa: ", error.message);
    res.status(400).json({
      message: "Error al borrar el Programa.",
      error: error.message,
    });
  }
};
