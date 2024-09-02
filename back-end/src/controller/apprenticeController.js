import ApprenticeModel from "../models/apprenticeModel.js";
import FichasModel from "../models/fichasModel.js";
import cityModel from "../models/cityModel.js";
import { Sequelize, Op } from "sequelize";
import { logger } from "../middleware/logMiddleware.js";

import csv from "csv-parser";
import fs from "fs";
import path from "path";

export const getAllApprentices = async (req, res) => {
  try {
    const apprentices = await ApprenticeModel.findAll({
      include: [
        {
          model: FichasModel,
          as: "fichas", // Alias usado para la relación
        },
        {
          model: cityModel,
          as: "ciudad", // Alias para la relación con Ciudad
        },
      ],
    });
    if(apprentices){
      res.status(200).json(apprentices);
      return
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener los aprendices: ${error}`);
  }
};

export const getApprentice = async (req, res) => {
  try {
    const apprentice = await ApprenticeModel.findByPk(req.params.Id_Aprendiz, {
      include: [
        {
          model: FichasModel,
          as: "fichas", // Alias usado para la relación
        },
        {
          model: cityModel,
          as: "ciudad", // Alias para la relación con Ciudad
        },
      ],
    });
    if (apprentice) {
      res.status(200).json(apprentice);
      return
    } else {
      res.status(404).json({ message: "Aprendiz no encontrado o no existe" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener el aprendiz: ${error}`);
  }
};

export const createApprentice = async (req, res) => {
  try {
    const {
      Id_Aprendiz,
      Nom_Aprendiz,
      Ape_Aprendiz,
      Id_Ficha,
      Fec_Nacimiento,
      Id_Ciudad,
      Lugar_Residencia,
      Edad,
      Hijos,
      Nom_Eps,
      Tel_Padre,
      Gen_Aprendiz,
      Cor_Aprendiz,
      Tel_Aprendiz,
      Tot_Memorandos,
      Tot_Inasistencias,
      Patrocinio,
      Estado,
      Nom_Empresa,
      CentroConvivencia,
    } = req.body;

    const Foto_Aprendiz = req.file ? req.file.filename : null

    const newApprentice = await ApprenticeModel.create({
      Id_Aprendiz,
      Nom_Aprendiz,
      Ape_Aprendiz,
      Id_Ficha,
      Fec_Nacimiento,
      Id_Ciudad,
      Lugar_Residencia,
      Edad,
      Hijos,
      Nom_Eps,
      Tel_Padre,
      Gen_Aprendiz,
      Cor_Aprendiz,
      Tel_Aprendiz,
      Tot_Memorandos,
      Tot_Inasistencias,
      Patrocinio,
      Estado,
      Nom_Empresa,
      CentroConvivencia,
      Foto_Aprendiz,
    });
    if (newApprentice) {
      res.status(201).json({
        apprentice: newApprentice,
        message: "Aprendiz Registrado Correctamente"
      });
      return;
    }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al crear el aprendiz: ${error}`);
  }
};


export const updateApprentice = async (req, res) => {
  try {
    const {
      Id_Aprendiz,
      Nom_Aprendiz,
      Ape_Aprendiz,
      Id_Ficha,
      Fec_Nacimiento,
      Id_Ciudad,
      Lugar_Residencia,
      Edad,
      Hijos,
      Nom_Eps,
      Tel_Padre,
      Gen_Aprendiz,
      Cor_Aprendiz,
      Tel_Aprendiz,
      Tot_Memorandos,
      Tot_Inasistencias,
      Patrocinio,
      Estado,
      Nom_Empresa,
      CentroConvivencia,
      Foto_Aprendiz
    } = req.body;

    const [updated] = await ApprenticeModel.update(
      {
        Id_Aprendiz,
        Nom_Aprendiz,
        Ape_Aprendiz,
        Id_Ficha,
        Fec_Nacimiento: new Date(Fec_Nacimiento).toISOString().split('T')[0],
        Id_Ciudad,
        Lugar_Residencia,
        Edad,
        Hijos,
        Nom_Eps,
        Tel_Padre,
        Gen_Aprendiz,
        Cor_Aprendiz,
        Tel_Aprendiz,
        Tot_Memorandos,
        Tot_Inasistencias,
        Patrocinio,
        Estado,
        Nom_Empresa,
        CentroConvivencia,
        Foto_Aprendiz,
      },
      {
        where: { Id_Aprendiz: req.params.Id_Aprendiz },
      }
    );

    if (updated === 0) {
      res.status(404).json({ message: "Aprendiz no encontrado" });
    } else {
      res.json({ message: "Aprendiz actualizado correctamente" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al actualizar el aprendiz: ${error}`);
  }
};




export const deleteApprentice = async (req, res) => {
  try {
    const result = await ApprenticeModel.destroy({
      where: { Id_Aprendiz: req.params.Id_Aprendiz },
    });
    if (result === 0) {
      res.status(404).json({ message: "Aprendiz no encontrado" });
    } else {
      res.json({ message: "Aprendiz eliminado correctamente" });
      return
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al eliminar el aprendiz: ${error}`);
  }
};

export const getQueryApprentice = async (req, res) => {
  try {
    const apprentices = await ApprenticeModel.findAll({
      where: {
        Id_Aprendiz: {
          [Op.like]: `%${req.params.Id_Aprendiz}%`,
        },
      },
      include: [
        {
          model: FichasModel,
          as: "fichas", // Alias usado para la relación
        },
        {
          model: cityModel,
          as: "ciudades", // Alias para la relación con Ciudad
        },
      ],
    });
    if(apprentices > 0){
      res.status(200).json(apprentices);
      return
    }
    else{
      res.status(404).json({
        message: "No se encontraron aprendices con ese nombre.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al buscar el aprendiz: ${error}`);
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
      return
    } else {
      res.status(404).json({
        message: "No se encontraron aprendices con ese nombre.",
      });
    }
  } catch (error) {
    logger.error("Error fetching apprentices by name: ", error.message);
    res.status(500).json({
      message: "Error al buscar los aprendices por nombre.",
      error: error.message,
    });
  }
};

export const importCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No se proporcionó un archivo CSV.",
      });
    }

    const filePath = path.join(__dirname, "../uploads", req.file.filename);

    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          // Ajusta los campos del CSV y el modelo según tu necesidad
          for (const row of results) {
            await ApprenticeModel.create({
              Id_Aprendiz: row.Id_Aprendiz,
              Nom_Aprendiz: row.Nom_Aprendiz,
              Ape_Aprendiz: row.Ape_Aprendiz,
              Id_Ficha: row.Id_Ficha,
              Fec_Nacimiento: row.Fec_Nacimiento,
              Id_Ciudad: row.Id_Ciudad,
              Lugar_Residencia: row.Lugar_Residencia,
              Edad: row.Edad,
              Hijos: row.Hijos,
              Nom_Eps: row.Nom_Eps,
              Tel_Padre: row.Tel_Padre,
              Gen_Aprendiz: row.Gen_Aprendiz,
              Cor_Aprendiz: row.Cor_Aprendiz,
              Tel_Aprendiz: row.Tel_Aprendiz,
              Tot_Memorandos: row.Tot_Memorandos,
              Tot_Inasistencias: row.Tot_Inasistencias,
              Patrocinio: row.Patrocinio,
              Estado: row.Estado,
              Nom_Empresa: row.Nom_Empresa,
              Fot_Aprendiz: row.Fot_Aprendiz,
              CentroConvivencia: row.CentroConvivencia,
            });
          }
          res.status(200).json({
            message: "Datos importados correctamente.",
            data: results,
          });
        } catch (error) {
          logger.error("Error importing data from CSV: ", error.message);
          res.status(500).json({
            message: "Error al importar los datos del CSV.",
            error: error.message,
          });
        }
      });
  } catch (error) {
    logger.error("Error processing CSV file: ", error.message);
    res.status(500).json({
      message: "Error al procesar el archivo CSV.",
      error: error.message,
    });
  }
};