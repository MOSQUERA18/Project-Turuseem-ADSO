import { logger } from "../middleware/logMiddleware.js";
import UnitModel from "../models/unitModel.js";
import AreaModel from "../models/areaModel.js";

export const getAllUnits = async (req, res) => {
  try {
    const units = await UnitModel.findAll({
      include: [
        {
          model: AreaModel,
          as: "areas"
        }
      ]
    });
    if (units.length > 0) {
      res.status(200).json(units);
    } else {
      res.status(404).json({
        message: "No se encontraron unidades.",
      });
    }
  } catch (error) {
    logger.error("Error fetching units: ", error.message);
    res.status(500).json({
      message: "Error al recuperar las unidades.",
    });
  }
};

export const getUnit = async (req, res) => {
  try {
    const unit = await UnitModel.findByPk(
      req.params.Id_Unidad, {
        include: [
          {
            model: AreaModel,
            as: "areas"
          }
        ]
      }
    );
    if (unit) {
      res.status(200).json(unit);
    } else {
      res.status(404).json({
        message: "Unidad no encontrada.",
      });
    }
  } catch (error) {
    logger.error("Error fetching unit: ", error.message);
    res.status(500).json({
      message: "Error al recuperar la unidad.",
    });
  }
};

export const createUnit = async (req, res) => {
  try {
    const newUnit = await UnitModel.create(req.body);
    res.status(201).json({
      message: "Unidad registrada correctamente!",
      data: newUnit,
    });
  } catch (error) {
    logger.error("Error creating unit: ", error.message);
    res.status(400).json({
      message: "Error al registrar la unidad.",
      error: error.message,
    });
  }
};

export const updateUnit = async (req, res) => {
  try {
    const [updated] = await UnitModel.update(req.body, {
      where: { Id_Unidad: req.params.Id_Unidad },
    });
    if (updated) {
      res.json({
        message: "Unidad actualizada correctamente!",
      });
    } else {
      res.status(404).json({
        message: "Unidad no encontrada.",
      });
    }
  } catch (error) {
    logger.error("Error updating unit: ", error.message);
    res.status(400).json({
      message: "Error al actualizar la unidad.",
      error: error.message,
    });
  }
};

export const deleteUnit = async (req, res) => {
  try {
    const deleted = await UnitModel.destroy({
      where: { Id_Unidad: req.params.Id_Unidad },
    });
    if (deleted) {
      res.json({
        message: "Unidad borrada correctamente!",
      });
    } else {
      res.status(404).json({
        message: "Unidad no encontrada.",
      });
    }
  } catch (error) {
    logger.error("Error deleting unit: ", error.message);
    res.status(400).json({
      message: "Error al borrar la unidad.",
      error: error.message,
    });
  }
};
