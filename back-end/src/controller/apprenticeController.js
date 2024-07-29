import { Sequelize } from "sequelize";
import fs from "fs";
import { parse } from "csv-parse";
import ApprenticeModel from "../models/apprenticeModel.js";
import { logger } from "../middleware/logMiddleware.js";

//Mostrar todos los registros
export const getAllApprentice = async (req, res) => {
  try {
    const responseDB = await ApprenticeModel.findAll();
    if (responseDB.length > 0) {
      res.status(200).json(responseDB);
    } else {
      res.status(404).json({ message: "No se encontraron registros." });
    }
  } catch (error) {
    logger.error("Error al traer los registros", error)
    res.status(500).json({
      message: "Error en el servidor. Por favor, inténtelo de nuevo más tarde.",
    });
  }
};
//Mostrar un registro
export const getApprentice = async (req, res) => {
  try {
    const responseDB = await ApprenticeModel.findAll({
      where: { Id_Aprendiz: req.params.Id_Aprendiz },
    });

    if (responseDB.length > 0) {
      res.status(200).json(responseDB[0]);
    } else {
      res.status(404).json({ message: "Aprendiz no encontrado." });
    }
  } catch (error) {
    logger.error("Error al traer el aprendiz: ", error);
    res.status(500).json({
      message: "Error en el servidor. Por favor, inténtelo de nuevo más tarde.",
    });
  }
};
//Crea un aprendiz
export const createApprentice = async (req, res) => {
  try {
    const respuestaDB = await ApprenticeModel.create(req.body);
    if (!respuestaDB.Id_Aprendiz) {
      res.status(201).json({ message: "Registro creado exitosamente!" });
    } else {
      res.status(400).json({
        message: "Ocurrio un error contacte al Administrador",
      });
    }
  } catch (error) {
    res.json({ message: error.message });
    logger.error(error);
  }
};
//Actualizar un registro
export const updateApprentice = async (req, res) => {
  try {
    const [updatedRowsCount] = await ApprenticeModel.update(req.body, {
      where: { Id_Aprendiz: req.params.Id_Aprendiz },
    });

    if (updatedRowsCount === 0) {
      res.status(404).json({
        message: "Aprendiz no encontrado o no se hicieron cambios.",
      });
    } else {
      res.status(200).json({
        message: "Registro actualizado exitosamente!",
      });
    }
  } catch (error) {
    logger.error("Error updating apprentice: ", error);
    res.status(500).json({
      message: "Error en el servidor. Por favor, inténtelo de nuevo más tarde.",
    });
  }
};
//Borrar un registro
export const deleteApprentice = async (req, res) => {
  try {
    const rowsDeleted = await ApprenticeModel.destroy({
      where: { Id_Aprendiz: req.params.Id_Aprendiz },
    });
    if (rowsDeleted === 0) {
      res.status(404).json({
        message: "Aprendiz no encontrado.",
      });
    } else {
      res.status(200).json({
        message: "Registro borrado exitosamente!",
      });
    }
  } catch (error) {
    logger.error("Error deleting apprentice: ", error);
    res.status(500).json({
      message: "Error en el servidor. Por favor, inténtelo de nuevo más tarde.",
    });
  }
};
//Consultar registro por su id
export const getQueryApprentice = async (req, res) => {
  try {
    const apprentices = await ApprenticeModel.findAll({
      where: {
        Id_Aprendiz: {
          [Sequelize.Op.like]: `%${req.params.Id_Aprendiz}%`,
        },
      },
    });
    if (apprentices.length > 0) {
      res.status(200).json(apprentices);
    } else {
      res.status(404).json({
        message: "No se encontraron registros que coincidan con la consulta.",
      });
    }
  } catch (error) {
    logger.error("Error fetching apprentice data: ", error);
    res.status(500).json({
      message: "Error en el servidor. Por favor, inténtelo de nuevo más tarde.",
    });
  }
};

export const getQueryNom_Apprentice = async (req, res) => {
  try {
    const apprentices = await ApprenticeModel.findAll({
      where: {
        Nom_Aprendiz: {
          [Sequelize.Op.like]: `%${req.params.Nom_Aprendiz}%`,
        },
      },
    });
    if (apprentices.length > 0) {
      res.status(200).json(apprentices);
    } else {
      res.status(404).json({
        message:
          "No se encontraron registros que coincidan con el nombre proporcionado.",
      });
    }
  } catch (error) {
    logger.error("Error fetching apprentice data by name: ", error);
    res.status(500).json({
      message: "Error en el servidor. Por favor, inténtelo de nuevo más tarde.",
    });
  }
};
export const importCSV = async (req, res) => {
  const fileCSV = req.files?.fileInput;
  if (!fileCSV) {
    return res.status(400).json({
      message: "No se ha proporcionado ningún archivo.",
    });
  }
  try {
    const rows = [];
    fs.createReadStream(fileCSV.tempFilePath)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", (row) => {
        rows.push(row);
      })
      .on("end", () => {
        res.status(200).json({
          message: "Archivo CSV procesado exitosamente",
          data: rows,
        });
      })
      .on("error", (error) => {
        console.error(error.message);
        logger.error("Error processing CSV file: ", error);
        res.status(500).json({
          message: "Error al procesar el archivo CSV.",
        });
      });
  } catch (error) {
    logger.error("Unexpected error in importCSV: ", error);
    res.status(500).json({ message: error.message });
  }
};