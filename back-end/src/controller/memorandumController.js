import { logger } from "../middleware/logMiddleware.js";
import MemorandumModel from "../models/memorandumModel.js";
import { Sequelize } from "sequelize";
import AbsenceModel from "../models/absenceModel.js";
import fs from "fs";
import pdf from "html-pdf";

export const getAllMemorandum = async (req, res) => {
  try {
    const memorandums = await MemorandumModel.findAll({
      include: [
        {
          model: AbsenceModel,
          as: "inasistencia", // Asegúrate de que el alias aquí coincida con el definido en el modelo
        },
      ],
    });
    if (memorandums.length > 0) {
      res.status(200).json(memorandums);
      return;
    } else {
      res.status(404).json({
        message: "No se encontraron memorandos.",
      });
    }
  } catch (error) {
    logger.error("Error fetching memorandums: ", error.message);
    res.status(500).json({
      message: "Error al recuperar los memorandos.",
    });
  }
};

export const getMemorandum = async (req, res) => {
  try {
    const memorandum = await MemorandumModel.findOne({
      where: { Id_Memorando: req.params.Id_Memorando },
      include: [
        {
          model: AbsenceModel,
          as: "inasistencia", // Asegúrate de que el alias aquí coincida con el definido en el modelo
        },
      ],
    });
    if (memorandum.length > 0) {
      res.status(200).json(memorandum);
      return;
    } else {
      res.status(404).json({
        message: "Memorando no encontrado.",
      });
    }
  } catch (error) {
    logger.error("Error fetching memorandum: ", error.message);
    res.status(500).json({
      message: "Error al recuperar el memorando.",
    });
  }
};

export const createMemorandum = async (req, res) => {
  try {
    const newMemorandum = await MemorandumModel.create(req.body);
    res.status(201).json({
      message: "Memorando registrado correctamente!",
      data: newMemorandum,
    });
  } catch (error) {
    logger.error("Error creating memorandum: ", error.message);
    res.status(400).json({
      message: "Error al registrar el memorando.",
      error: error.message,
    });
  }
};

export const updateMemorandum = async (req, res) => {
  try {
    const [updated] = await MemorandumModel.update(req.body, {
      where: { Id_Memorando: req.params.Id_Memorando },
    });
    if (updated) {
      res.json({
        message: "Memorando actualizado correctamente!",
      });
      return;
    } else {
      res.status(404).json({
        message: "Memorando no encontrado.",
      });
    }
  } catch (error) {
    logger.error("Error updating memorandum: ", error.message);
    res.status(400).json({
      message: "Error al actualizar el memorando.",
      error: error.message,
    });
  }
};

export const deleteMemorandum = async (req, res) => {
  try {
    const deleted = await MemorandumModel.destroy({
      where: { Id_Memorando: req.params.Id_Memorando },
    });
    if (deleted) {
      res.json({
        message: "Memorando borrado correctamente!",
      });
      return;
    } else {
      res.status(404).json({
        message: "Memorando no encontrado.",
      });
    }
  } catch (error) {
    logger.error("Error deleting memorandum: ", error.message);
    res.status(400).json({
      message: "Error al borrar el memorando.",
      error: error.message,
    });
  }
};

export const getQueryMemorandum = async (req, res) => {
  try {
    const memorandums = await MemorandumModel.findAll({
      where: {
        Id_Memorando: {
          [Sequelize.Op.like]: `%${req.params.Id_Memorando}%`,
        },
      },
      include: [
        {
          model: AbsenceModel,
          as: "inasistencia", // Asegúrate de que el alias aquí coincida con el definido en el modelo
        },
      ],
    });
    if (memorandums.length > 0) {
      res.json(memorandums);
      return;
    } else {
      res.status(404).json({
        message: "No se encontraron memorandos.",
      });
    }
  } catch (error) {
    logger.error("Error fetching memorandum: ", error.message);
    res.status(500).json({
      message: "Error al consultar el memorando.",
      error: error.message,
    });
  }
};

export const generateMemorandumPdf = (req, res) => {
  const { nombre, fecha, contenido } = req.body;
  const raiz = process.cwd() + "\\src";
  console.log(raiz);

  const htmlTemplate = fs.readFileSync(
    `${raiz}/public/Plantillas/template.html`,
    "utf-8"
  );

  const htmlContent = htmlTemplate
    .replace("{{nombre}}", nombre)
    .replace("{{fecha}}", fecha)
    .replace("{{contenido}}", contenido);

  pdf.create(htmlContent).toBuffer((err, buffer) => {
    if (err) {
      res.status(500).json({ err: err });
    }
    const base64 = buffer.toString("base64");
    res.status(200).json({ Reporte: base64 });
  });
};
