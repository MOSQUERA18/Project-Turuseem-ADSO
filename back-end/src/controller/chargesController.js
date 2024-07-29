// import { Sequelize } from "sequelize";
import ChargesModel from "../models/chargesModel.js";
import { logger } from "../middleware/logMiddleware.js";

export const getAllCharges = async (req, res) => {
  try {
    const responseDB = await ChargesModel.findAll();
    if (responseDB.length > 0) {
      res.status(200).json(responseDB);
    } else {
      res.status(404).json({
        message: "No se encontraron registros.",
      });
    }
  } catch (error) {
    logger.error("Error al traer los registros", error);
    res.status(500).json({
      message: "Error en el servidor. Por favor, inténtelo de nuevo más tarde.",
    });
  }
};

export const getCharges = async (req, res) => {
  try {
    const responseDB = await ChargesModel.findAll({
      where: { Id_Cargo: req.params.Id_Cargo },
    });
    if (responseDB.length > 0) {
      res.status(200).json(responseDB[0]);
    } else {
      res.status(404).json({ message: "Cargo no encontrado." });
    }
  } catch (error) {
    logger.error("Error al traer el cargo: ", error);
    res.status(500).json({
      message: "Error en el servidor. Por favor, inténtelo de nuevo más tarde.",
    });
  }
};

export const cretaeCharge = async (req, res) => {
  try {
    const responseDB = await ChargesModel.create(req.body);
    if (!responseDB.Id_Cargo) {
      res.status(201).json({ message: "Registro creado exitosamente!" });
    } else {
      res
        .status(404)
        .json({ message: "Ocurrio un error contacte al Administrador" });
    }
  } catch (error) {
    res.json({ message: error.message });
    logger.error(error);
  }
};

export const updateCharge = async (req, res) => {
  try {
    const [updatedRowsCount] = await ChargesModel.update(req.body, {
      where: { Id_Cargo: req.params.Id_Cargo },
    });
    if (updatedRowsCount == 0) {
      res.status(404).json({
        message: "Cargo no encontrado o no se hicieron cambios.",
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


