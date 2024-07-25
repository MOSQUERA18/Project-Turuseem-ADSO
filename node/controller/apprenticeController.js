import { Sequelize } from "sequelize";
import fs from "fs";
import { parse } from "csv-parse";
import ApprenticeModel from "../models/apprenticeModel.js";
import { logger } from "../middleware/logMiddleware.js";

//Mostrar todos los registros
export const getAllApprentice = async (req, res) => {
  try {
    throw new Error("Error forzado para prueba de logs");
    const apprentice = await ApprenticeModel.findAll();
    res.json(apprentice);
  } catch (error) {
    res.json({ message: error.message });
    logger.error(error.message);
  }
};
//Mostrar un registro
export const getApprentice = async (req, res) => {
  try {
    const apprentice = await ApprenticeModel.findAll({
      where: { Id_Aprendiz: req.params.Id_Aprendiz },
    });
    res.json(apprentice[0]);
  } catch (error) {
    res.json({ message: error.message });
    logger.error(error.message);
  }
};
//Crea un aprendiz
export const createApprentice = async (req, res) => {
  try {
    await ApprenticeModel.create(req.body);
    res.json({ message: "Registro creado exitosamente!" });
  } catch (error) {
    res.json({ message: error.message });
    logger.error(error.message);
  }
};
//Actualizar un registro
export const updateApprentice = async (req, res) => {
  try {
    await ApprenticeModel.update(req.body, {
      where: { Id_Aprendiz: req.params.Id_Aprendiz },
    });
    res.json({ message: "Registro actualizado exitosamente!" });
  } catch (error) {
    res.json({ message: error.message });
    logger.error(error.message);
  }
};
//Borrar un registro
export const deleteApprentice = async (req, res) => {
  try {
    await ApprenticeModel.destroy({
      where: { Id_Aprendiz: req.params.Id_Aprendiz },
    });
    res.json({ message: "Registro borrado exitosamente!" });
  } catch (error) {
    res.json({ message: error.message });
    logger.error(error.message);
  }
};
//Consultar registro por su id
export const getQueryApprentice = async (req, res) => {
  try {
    const apprentice = await ApprenticeModel.findAll({
      where: {
        Id_Aprendiz: {
          [Sequelize.Op.like]: `%${req.params.Id_Aprendiz}%`,
        }
      },
    });
    res.json(apprentice);
  } catch (error) {
    res.json({ message: error.message });
    logger.error(error.message);
  }
};

export const getQueryNom_Apprentice = async (req, res) => {
  try {
    const apprentice = await ApprenticeModel.findAll({
      where: {
        Nom_Aprendiz: {
          [Sequelize.Op.like]: `%${req.params.Nom_Aprendiz}%`,
        },
      },
    });
    res.json(apprentice);
  } catch (error) {
    res.json({ message: error.message });
    logger.error(error.message);
  }
};

export const importCSV = async (req, res) => {
  const fileCSV = req.files?.fileInput
  try {
    fs.createReadStream(fileCSV)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", (row) => {
        console.log(row);
      })
      .on("end", () =>{
        console.log("finished");
      })
      .on("error", (error) => {
        console.log(error.message);
      });
      res.json({row})
  } catch (error) {
    res.json({ message: error.message });
    logger.error(error.message);
  }
}
