import { logger } from "../middleware/logMiddleware.js";
import FileCsvModel from "../models/fileCsvModel.js";

export const getAllFileCsvs = async (req, res) => {
  try {
    const fileCsvs = await FileCsvModel.findAll();
    if (fileCsvs.length > 0) {
      res.status(200).json(fileCsvs);
      return
    } else {
      res.status(404).json({
        message: "No se encontraron archivos CSV.",
      });
    }
  } catch (error) {
    logger.error("Error fetching file CSVs: ", error.message);
    res.status(500).json({
      message: "Error al recuperar los archivos CSV.",
    });
  }
};

export const getFileCsv = async (req, res) => {
  try {
    const fileCsv = await FileCsvModel.findOne({
      where: { Id_Archivo_Csv: req.params.Id_Archivo_Csv },
    });
    if (fileCsv) {
      res.status(200).json(fileCsv);
      return
    } else {
      res.status(404).json({
        message: "Archivo CSV no encontrado.",
      });
    }
  } catch (error) {
    logger.error("Error fetching file CSV: ", error.message);
    res.status(500).json({
      message: "Error al recuperar el archivo CSV.",
    });
  }
};

export const createFileCsv = async (req, res) => {
  try {
    const newFileCsv = await FileCsvModel.create(req.body);
    res.status(201).json({
      message: "Archivo CSV registrado correctamente!",
      data: newFileCsv,
      
    });
  } catch (error) {
    logger.error("Error creating file CSV: ", error.message);
    res.status(400).json({
      message: "Error al registrar el archivo CSV.",
      error: error.message,
    });
  }
};

export const updateFileCsv = async (req, res) => {
  try {
    const [updated] = await FileCsvModel.update(req.body, {
      where: { Id_Archivo_Csv: req.params.Id_Archivo_Csv },
    });
    if (updated) {
      res.json({
        message: "Archivo CSV actualizado correctamente!",
        
      });
      return
    } else {
      res.status(404).json({
        message: "Archivo CSV no encontrado.",
      });
    }
  } catch (error) {
    logger.error("Error updating file CSV: ", error.message);
    res.status(400).json({
      message: "Error al actualizar el archivo CSV.",
      error: error.message,
    });
  }
};

export const deleteFileCsv = async (req, res) => {
  try {
    const deleted = await FileCsvModel.destroy({
      where: { Id_Archivo_Csv: req.params.Id_Archivo_Csv },
    });
    if (deleted) {
      res.json({
        message: "Archivo CSV borrado correctamente!",
      });
      return
    } else {
      res.status(404).json({
        message: "Archivo CSV no encontrado.",
      });
    }
  } catch (error) {
    logger.error("Error deleting file CSV: ", error.message);
    res.status(400).json({
      message: "Error al borrar el archivo CSV.",
      error: error.message,
    });
  }
};
