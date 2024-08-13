import { logger } from "../middleware/logMiddleware.js";
import AreaModel from "../models/cityModel.js";

export const getAllCities = async (req, res) => {
  try {
    const cities = await AreaModel.findAll();
    if (cities.length > 0) {
      res.status(200).json(cities);
      return
    } else {
      res.status(404).json({
        message: "No se encontraron ciudades.",
      });
    }
  } catch (error) {
    logger.error("Error fetching ciudades: ", error.message);
    res.status(500).json({
      message: "Error al recuperar las ciudades.",
    });
  }
};