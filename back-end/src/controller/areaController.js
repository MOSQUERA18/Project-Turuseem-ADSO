import { logger } from "../middleware/logMiddleware.js";
import AreaModel from "../models/areaModel.js";

export const getAllAreas = async (req, res) => {
  try {
    // Intentamos obtener todas las áreas de la base de datos
    const areas = await AreaModel.findAll();

    // Verificamos si se encontraron áreas
    if (areas.length > 0) {
      // Si se encontraron áreas, devolvemos un código 200 y las áreas en formato JSON
      return res.status(200).json(areas);
    } else {
      // Si no se encontraron áreas, devolvemos un código 404 con un mensaje adecuado
      return res.status(404).json({
        message: "No se encontraron áreas.",
      });
    }
  } catch (error) {
    // Si ocurre un error durante la consulta, lo registramos y devolvemos un código 500 con un mensaje de error
    logger.error("Error fetching areas: ", error.message);
    return res.status(500).json({
      message: "Error al recuperar las áreas.",
      error: error.message,
    });
  }
};

