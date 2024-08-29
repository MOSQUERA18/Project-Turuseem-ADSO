import { logger } from "../middleware/logMiddleware.js";
import cityModel from "../models/cityModel.js";

export const getAllCities = async (req, res) => {
  try {
    const cities = await cityModel.findAll();
    if (cities) {
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