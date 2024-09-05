import { logger } from "../middleware/logMiddleware.js";
import ApprenticeModel from "../models/apprenticeModel.js";
import fs from "fs";
import pdf from "html-pdf";
import db from "../database/db.js";
import OtrosMemorandumModel from "../models/Otros_MemorandosModel.js";
import FichasModel from "../models/fichasModel.js";
import ProgramaModel from "../models/programaModel.js";

export const getAllOtrosMemorandum = async (req, res) => {
  try {
    const memorandums = await OtrosMemorandumModel.findAll({
      include: [
        {
          model: ApprenticeModel,
          as: "aprendiz",
          include: [
            {
              model: FichasModel,
              as: "fichas",
              include: [
                {
                  model: ProgramaModel,
                  as: "programasFormacion",
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

export const getOtroMemorandum = async (req, res) => {
  try {
    const memorandum = await OtrosMemorandumModel.findOne({
      where: { Id_Memorando: req.params.Id_Memorando },
      include: [
        {
          model: ApprenticeModel,
          as: "aprendiz",
          include: [
            {
              model: FichasModel,
              as: "fichas",
              include: [
                {
                  model: ProgramaModel,
                  as: "programasFormacion",
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

export const getTotalOtrosMemorandums = async () => {
  try {
    return await OtrosMemorandumModel.count();
  } catch (error) {
    logger.error("Error obteniendo el total de memorandos: ", error.message);
    throw new Error("Error al obtener el total de memorandos.");
  }
};

export const createOtroMemorandum = async (req, res) => {
  const transaction = await db.transaction();
  try {
    const newMemorandum = await OtrosMemorandumModel.create(req.body, {
      transaction,
    });

    // Obtener el memorando recién creado junto con las relaciones necesarias
    const fullMemorandum = await OtrosMemorandumModel.findOne({
      where: {
        Id_Memorando: newMemorandum.Id_Memorando,
      },
      include: [
        {
          model: ApprenticeModel,
          as: "aprendiz",
          include: [
            {
              model: FichasModel,
              as: "fichas",
              include: [
                {
                  model: ProgramaModel,
                  as: "programasFormacion",
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

export const updateOtroMemorandum = async (req, res) => {
  try {
    const [updated] = await OtrosMemorandumModel.update(req.body, {
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

export const deleteOtroMemorandum = async (req, res) => {
  try {
    const deleted = await OtrosMemorandumModel.destroy({
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

export const generateOtroMemorandumPdf = (memorandum, totalMemorandums) => {
//   const { nombre, fecha, contenido } = memorandum;
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
    .replace("{{NombreAprendiz}}", aprendiz.Nom_Aprendiz)
    .replace("{{ProgramaFormacion}}", aprendiz)
    .replace("{{FichaNo}}", aprendiz)
    .replace("{{UnidadAsignada}}", aprendiz)
    .replace("{{FechaActual}}", aprendiz);

  pdf.create(htmlContent).toBuffer((err, buffer) => {
    if (err) {
      res.status(500).json({ err: err });
    }
    const base64 = buffer.toString("base64");
    res.status(200).json({ Reporte: base64 });
  });
};
