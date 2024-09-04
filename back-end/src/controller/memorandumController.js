import { logger } from "../middleware/logMiddleware.js";
import MemorandumModel from "../models/memorandumModel.js";
import AbsenceModel from "../models/absenceModel.js";
import TurnoRutinarioModel from "../models/turnoRutinarioModel.js";
import ApprenticeModel from "../models/apprenticeModel.js";
import UnitModel from "../models/unitModel.js";
import fs from "fs";
import pdf from "html-pdf";
import db from "../database/db.js";

export const getAllMemorandum = async (req, res) => {
  try {
    const memorandums = await MemorandumModel.findAll({
      include: [
        {
          model: AbsenceModel,
          as: "inasistencia",
          include: [
            {
              model: TurnoRutinarioModel,
              as: "turnorutinario", // Alias usado para la relación Turno Rutinario
              include: [
                {
                  model: ApprenticeModel,
                  as: "aprendiz", // Alias para la relación con Aprendiz
                },
                {
                  model: UnitModel,
                  as: "unidad", // Alias para la relación con Unidad
                },
              ],
            },
          ],
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
          as: "inasistencia",
          include: [
            {
              model: TurnoRutinarioModel,
              as: "turnorutinario", // Alias usado para la relación Turno Rutinario
              include: [
                {
                  model: ApprenticeModel,
                  as: "aprendiz", // Alias para la relación con Aprendiz
                },
                {
                  model: UnitModel,
                  as: "unidad", // Alias para la relación con Unidad
                },
              ],
            },
          ],
        },
      ],
    });
    if (memorandum) {
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

export const getTotalMemorandums = async () => {
  try {
    return await MemorandumModel.count();
  } catch (error) {
    logger.error("Error obteniendo el total de memorandos: ", error.message);
    throw new Error("Error al obtener el total de memorandos.");
  }
};

export const createMemorandum = async (req, res) => {
  const transaction = await db.transaction();
  try {
    const newMemorandum = await MemorandumModel.create(req.body, {
      transaction,
    });

    // Obtener el memorando recién creado junto con las relaciones necesarias
    const fullMemorandum = await MemorandumModel.findOne({
      where: {
        Id_Memorando: newMemorandum.Id_Memorando,
      },
      include: [
        {
          model: AbsenceModel,
          as: "inasistencia",
          include: [
            {
              model: TurnoRutinarioModel,
              as: "turnorutinario",
              include: [
                {
                  model: ApprenticeModel,
                  as: "aprendiz",
                },
                {
                  model: UnitModel,
                  as: "unidad",
                },
              ],
            },
          ],
        },
      ],
      transaction,
    });
    console.log(fullMemorandum);
    // const totalMemorandums = await getTotalMemorandums();

    // await generateMemorandumPdf(fullMemorandum, totalMemorandums);

    await transaction.commit();

    res.status(201).json({
      message: "Memorando registrado y PDF generado correctamente!",
      data: newMemorandum,
    });
  } catch (error) {
    await transaction.rollback();
    logger.error("Error creating memorandum: ", error);
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

export const generateMemorandumPdf = (memorandum, totalMemorandums) => {
  const { nombre, fecha, contenido } = memorandum;
  const { inasistencia } = memorandum;
  const { turnorutinario } = inasistencia;
  const { aprendiz, unidad } = turnorutinario;
  const raiz = process.cwd() + "\\src";

  const plantillaHtml = fs.readFileSync(
    `${raiz}/public/plantillas/plantilla-memorando.html`,
    "utf-8"
  );
  const hoy = new Date();

  const dia = hoy.getDate(); // Obtiene el día (1-31)
  const mes = hoy.getMonth() + 1; // Obtiene el mes (0-11). Sumar 1 para obtener el mes en formato 1-12
  const año = hoy.getFullYear(); // Obtiene el año (ej. 2024)

  const fechaActual = `${dia}/${mes}/${año}`;
  const htmlContent = plantillaHtml
    .replace("{{FechaActual}}", fechaActual)
    .replace("{{NumeroMemorando}}", totalMemorandums)
    .replace("{{NombreAprendiz}}", aprendiz.Nom_Aprendiz )
    .replace("{{ProgramaFormacion}}", aprendiz)
    .replace("{{FichaNo}}", aprendiz )
    .replace("{{UnidadAsignada}}", aprendiz )
    .replace("{{FechaActual}}", aprendiz)

  pdf.create(htmlContent).toBuffer((err, buffer) => {
    if (err) {
      res.status(500).json({ err: err });
    }
    const base64 = buffer.toString("base64");
    res.status(200).json({ Reporte: base64 });
  });
};
