import { logger } from "../middleware/logMiddleware.js";
import fileCsvModel from "../models/fileCsvModel.js"



export const getAllFileCsvs = async (req, res) => {
  try {
    const fileCsvs = await fileCsvModel.findAll();
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
    const fileCsv = await fileCsvModel.findOne({
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


export const deleteFileCsv = async (req, res) => {
  try {
    const deleted = await fileCsvModel.destroy({
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
