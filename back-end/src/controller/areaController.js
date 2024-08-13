import { logger } from "../middleware/logMiddleware.js";
import AreaModel from "../models/areaModel.js";

export const getAllAreas = async (req, res) => {
  try {
    const areas = await AreaModel.findAll();
    if (areas.length > 0) {
      res.status(200).json(areas);
      return
    } else {
      res.status(404).json({
        message: "No se encontraron áreas.",
      });
    }
  } catch (error) {
    logger.error("Error fetching areas: ", error.message);
    res.status(500).json({
      message: "Error al recuperar las áreas.",
    });
  }
};
