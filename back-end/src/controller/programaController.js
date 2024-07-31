import { Sequelize } from "sequelize";
import ProgramaModel from "../models/programaModel.js";
import { logger } from "../middleware/logMiddleware.js";

//mostrar todos los registros
export const getAllPrograma = async (req, res) => {
  try {
    const programas = await ProgramaModel.findAll();
    res.status(200).json(programas);
  } catch (error) {
    logger.error("Error fetching all programs: ", error.message);
    res.status(500).json({
      message: "Error al obtener los programas.",
      error: error.message,
    });
  }
};
//mostrar un registro
export const getPrograma = async (req, res) => {
  try {
    const programa = await ProgramaModel.findByPk(req.params.Id_Programa);
    if (programa) {
      res.status(200).json(programa);
    } else {
      res.status(404).json({
        message: "Programa no encontrado",
      });
    }
  } catch (error) {
    logger.error(
      `Error fetching program with ID ${req.params.Id_Programa}: ${error.message}`
    );
    res.status(500).json({
      message: "Error al obtener el programa.",
      error: error.message,
    });
  }
};
//crear un player
export const createPrograma = async (req, res) => {
  try {
    const respuestaDB = await ProgramaModel.create(req.body);
    if (respuestaDB.Id_Programa) {
      res.status(201).json({ message: "¡Registro creado exitosamente!" });
    } else {
      res.status(400).json({
        message: "Ocurrió un error, contacte al administrador.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(error.message);
  }
};

//actualizar un registro
export const updatePrograma = async (req, res) => {
  try {
    const { Id_Programa, Nom_Programa, Tip_Programa } = req.body;

    const [updatedRows] = await ProgramaModel.update(
      {
        Nom_Programa,
        Tip_Programa,
      },
      {
        where: { Id_Programa: req.params.Id_Programa },
      }
    );

    // Verificar si se actualizó algún registro
    if (updatedRows === 0) {
      res.status(404).json({
        message: "Programa no encontrado",
      });
    } else {
      res.json({
        message: "Programa actualizado correctamente",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(error.message);
  }
};

//borrar un registro
export const deletePrograma = async (req, res) => {
  try {
    const deletedRows = await ProgramaModel.destroy({
      where: { Id_Programa: req.params.Id_Programa },
    });
    console.log(deletedRows);
    if (deletedRows === 0) {
      res.status(404).json({
        message: "Programa no encontrado",
      });
    } else {
      res.json({
        message: "¡Registro borrado exitosamente!",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(error.message);
  }
};

//Consultar programa por nombre
export const getQueryPrograma = async (req, res) => {
  try {
    const programas = await ProgramaModel.findAll({
      where: {
        Nom_Programa: {
          [Op.like]: `%${req.params.Nom_Programa}%`,
        },
      },
    });
    if (programas.length > 0) {
      res.status(200).json(programas);
    } else {
      res.status(404).json({
        message: "No se encontraron programas que coincidan con la búsqueda",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(error.message);
  }
};
