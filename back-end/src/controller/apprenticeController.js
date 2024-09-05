import ApprenticeModel from "../models/apprenticeModel.js";
import FichasModel from "../models/fichasModel.js";
import cityModel from "../models/cityModel.js";
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
    if (apprentices.length > 0) {
      return res.status(200).json(apprentices);
    } else {
      return res.status(404).json({ message: "No se encontraron aprendices." });
    }
  } catch (error) {
    logger.error(`Error al obtener los aprendices: ${error.message}`);
    return res.status(500).json({ message: "Error interno del servidor", error: error.message });
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
      return res.status(200).json(apprentice);
    } else {
      return res.status(404).json({ message: "Aprendiz no encontrado o no existe" });
    }
  } catch (error) {
    logger.error(`Error al obtener el aprendiz: ${error.message}`);
    return res.status(500).json({ message: "Error interno del servidor", error: error.message });
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

    const Foto_Aprendiz = req.file ? req.file.filename : null;

    // Validación de campos obligatorios
    if (!Id_Aprendiz || !Nom_Aprendiz || !Ape_Aprendiz || !Id_Ficha || !Fec_Nacimiento || !Id_Ciudad || !Lugar_Residencia || !Edad || !Hijos || !Nom_Eps || !Tel_Padre || !Gen_Aprendiz || !Cor_Aprendiz || !Tel_Aprendiz || !Tot_Memorandos || !Tot_Inasistencias|| !Estado || !CentroConvivencia) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

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
        message: "Aprendiz registrado correctamente",
      });
      return;
    }
  } catch (error) {
    logger.error(`Error al crear el aprendiz: ${error.message}`);
    return res.status(500).json({ message: "Error interno del servidor", error: error.message });
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
      return res.status(404).json({ message: "Aprendiz no encontrado" });
    } else {
      return res.json({ message: "Aprendiz actualizado correctamente" });
    }
  } catch (error) {
    logger.error(`Error al actualizar el aprendiz: ${error.message}`);
    return res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

export const deleteApprentice = async (req, res) => {
  try {
    const result = await ApprenticeModel.destroy({
      where: { Id_Aprendiz: req.params.Id_Aprendiz },
    });
    if (result === 0) {
      return res.status(404).json({ message: "Aprendiz no encontrado" });
    } else {
      return res.json({ message: "Aprendiz eliminado correctamente" });
    }
  } catch (error) {
    logger.error(`Error al eliminar el aprendiz: ${error.message}`);
    return res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

export const importCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se proporcionó un archivo CSV." });
    }

    const filePath = path.join(__dirname, "../uploads", req.file.filename);

    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
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
          return res.status(200).json({
            message: "Datos importados correctamente.",
            data: results,
          });
        } catch (error) {
          logger.error(`Error al importar los datos del CSV: ${error.message}`);
          return res.status(500).json({
            message: "Error al importar los datos del CSV.",
            error: error.message,
          });
        }
      });
  } catch (error) {
    logger.error(`Error al procesar el archivo CSV: ${error.message}`);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
 