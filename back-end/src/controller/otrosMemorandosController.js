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
    logger.error("Error fetching memorandums: ", error);
    res.status(500).json({
      message: "Error al recuperar los memorandos.",
    });
  }
};

export const getOtroMemorandum = async (req, res) => {
  try {
    const memorandum = await OtrosMemorandumModel.findOne({
      where: { Id_OtroMemorando: req.params.Id_OtroMemorando },
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
export const getTotalOtrosMemorandumsForAprendiz = async (Id_Aprendiz) => {
  try {
    return await OtrosMemorandumModel.count({
      where: { Id_Aprendiz: Id_Aprendiz },
    });
  } catch (error) {
    logger.error("Error obteniendo el total de memorandos: ", error.message);
    throw new Error("Error al obtener el total de memorandos.");
  }
};

export const createOtroMemorandum = async (req, res) => {
  const transaction = await db.transaction();
  try {
    // 1. Crear el memorando en la base de datos
    const newMemorandum = await OtrosMemorandumModel.create(req.body, {
      transaction,
    });

    // 2. Obtener el memorando recién creado junto con las relaciones necesarias
    const fullMemorandum = await OtrosMemorandumModel.findOne({
      where: {
        Id_OtroMemorando: newMemorandum.Id_OtroMemorando,
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

    const totalMemorandumForApprentice =
      await getTotalOtrosMemorandumsForAprendiz(
        fullMemorandum.aprendiz.Id_Aprendiz
      );
    const totalMemorandums = await getTotalOtrosMemorandums();

    // 3. Generar el PDF en Base64
    const pdfBase64 = await generateOtroMemorandumPdf(
      fullMemorandum,
      totalMemorandums,
      totalMemorandumForApprentice
    );

    // 4. Confirmar la transacción
    await transaction.commit();

    // 5. Enviar la respuesta con el memorando creado y el PDF en Base64
    res.status(201).json({
      message: "Memorando registrado y PDF generado correctamente!",
      data: newMemorandum,
      pdfBase64: pdfBase64,
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
      where: { Id_OtroMemorando: req.params.Id_OtroMemorando },
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
    logger.error("Error updating memorandum: ", error);
    res.status(400).json({
      message: "Error al actualizar el memorando.",
      error: error.message,
    });
  }
};

export const deleteOtroMemorandum = async (req, res) => {
  try {
    const deleted = await OtrosMemorandumModel.destroy({
      where: { Id_OtroMemorando: req.params.Id_OtroMemorando },
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

export const generateOtroMemorandumPdf = (
  memorandum,
  totalMemorandums,
  totalMemorandumForApprentice
) => {
  return new Promise((resolve, reject) => {
    const { aprendiz, Fec_OtroMemorando, Mot_OtroMemorando } = memorandum;
    const { fichas } = aprendiz;
    const { programasFormacion } = fichas;
    const raiz = process.cwd();

    const plantillaHtml = fs.readFileSync(
      `${raiz}/public/plantillas/plantilla-memorando.html`,
      "utf-8"
    );
    const hoy = new Date();
    const mes = hoy.getMonth() + 1;
    const año = hoy.getFullYear();
    let trimestreActual;
    if (mes >= 1 && mes <= 3) {
      trimestreActual = "I";
    } else if (mes >= 4 && mes <= 6) {
      trimestreActual = "II";
    } else if (mes >= 7 && mes <= 9) {
      trimestreActual = "III";
    } else if (mes >= 10 && mes <= 12) {
      trimestreActual = "IV";
    }

    const htmlContent = plantillaHtml
      .replace("{{FechaActual}}", Fec_OtroMemorando)
      .replace("{{NumeroMemorando}}", totalMemorandums)
      .replace("{{NombreAprendiz}}", aprendiz.Nom_Aprendiz)
      .replace("{{ApellidoAprendiz}}", aprendiz.Ape_Aprendiz)
      .replace(
        "{{ProgramaFormacion}}",
        programasFormacion.Nom_ProgramaFormacion
      )
      .replace("{{FichaNo}}", fichas.Id_Ficha)
      .replace("{{UnidadAsignada}}", "Sena Empresa")
      .replace("{{FechaActual}}", Fec_OtroMemorando)
      .replace("{{Mot_OtroMemorando}}", Mot_OtroMemorando)
      .replace("{{totalMemorandumForApprentice}}", totalMemorandumForApprentice)
      .replace("{{trimestre}}", trimestreActual)
      .replace("{{AnoActual}}", año)
      .replace("{{NombreLider}}", "Daniel Cardenas")
      .replace("{{TalentoHumano}}", "Monica");

    const options = {
      format: "A4",
      orientation: "portrait",
      border: "10mm",
      timeout: 30000,
      base: 'http://localhost:8000'
    };
    console.log(htmlContent);
    
    pdf.create(htmlContent, options).toBuffer((err, buffer) => {
      if (err) {
        return reject(err);
      }
      const base64 = buffer.toString("base64");
      resolve(base64);
    });
  });
};
