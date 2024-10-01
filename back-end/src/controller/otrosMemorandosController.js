import { logger } from "../middleware/logMiddleware.js";
import ApprenticeModel from "../models/apprenticeModel.js";
import fs from "fs";
import pdf from "html-pdf";
import db from "../database/db.js";
import OtrosMemorandumModel from "../models/Otros_MemorandosModel.js";
import FichasModel from "../models/fichasModel.js";
import ProgramaModel from "../models/programaModel.js";
import { emailMemorandos } from "../helpers/emailMemorandos.js";

export const getAllOtrosMemorandum = async (req, res) => {
  try {
    const query = `
    SELECT om.Id_OtroMemorando,
           om.Fec_OtroMemorando,
           om.Mot_OtroMemorando,
           om.Referencia_Id,
           a.Id_Aprendiz,
           a.Nom_Aprendiz,
           a.Ape_Aprendiz,
           a.Id_Ficha,  -- Ahora traemos el Id_Ficha desde aprendices
           f.Id_ProgramaFormacion,
           p.Nom_ProgramaFormacion,
           tr.Id_TurnoRutinario
    FROM otros_memorandos om
    LEFT JOIN aprendices a ON om.Referencia_Id = a.Id_Aprendiz
    LEFT JOIN fichas f ON a.Id_Ficha = f.Id_Ficha -- Usar Id_Ficha para unirse a fichas
    LEFT JOIN programasformacion p ON f.Id_ProgramaFormacion = p.Id_ProgramaFormacion
    LEFT JOIN turnosrutinarios tr ON om.Referencia_Id = tr.Id_TurnoRutinario
    WHERE (a.Id_Aprendiz IS NOT NULL OR tr.Id_TurnoRutinario IS NOT NULL);
`;
    const [memorandums] = await db.query(query);

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
    const query = `
      SELECT om.Id_OtroMemorando,
             om.Fec_OtroMemorando,
             om.Mot_OtroMemorando,
             om.Referencia_Id,
             a.Id_Aprendiz,
             a.Nom_Aprendiz,
             a.Ape_Aprendiz,
             a.Id_Ficha,
             f.Id_ProgramaFormacion,
             p.Nom_ProgramaFormacion,
             tr.Id_TurnoRutinario
      FROM otros_memorandos om
      LEFT JOIN aprendices a ON om.Referencia_Id = a.Id_Aprendiz
      LEFT JOIN fichas f ON a.Id_Ficha = f.Id_Ficha
      LEFT JOIN programasformacion p ON f.Id_ProgramaFormacion = p.Id_ProgramaFormacion
      LEFT JOIN turnosrutinarios tr ON om.Referencia_Id = tr.Id_TurnoRutinario
      WHERE om.Id_OtroMemorando = :Id_OtroMemorando;
    `;
    
    const [memorandum] = await db.query(query, {
      replacements: { Id_OtroMemorando: req.params.Id_OtroMemorando }
    });

    if (memorandum.length > 0) {
      res.status(200).json(memorandum[0]); // Retorna el primer elemento si se encontró
      return;
    } else {
      res.status(404).json({
        message: "Memorando no encontrado.",
      });
    }
  } catch (error) {
    logger.error("Error fetching memorandum: ", error);
    res.status(500).json({
      message: "Error al recuperar el memorando.",
    });
  }
};

export const getTotalOtrosMemorandums = async () => {
  try {
    return await OtrosMemorandumModel.count();
  } catch (error) {
    console.error("Error del total de memorandos",error);
    logger.error("Error obteniendo el total de memorandos: ", error);
    throw new Error("Error al obtener el total de memorandos.");
  }
};
export const getTotalOtrosMemorandumsForAprendiz = async (Id_Aprendiz) => {
  try {
    return await OtrosMemorandumModel.count({
      where: { Id_Aprendiz },
    });
  } catch (error) {
    logger.error("Error obteniendo el total de memorandos: ", error);
    throw new Error("Error al obtener el total de memorandos.");
  }
};

export const createOtroMemorandum = async (req, res) => {
  const transaction = await db.transaction();
  try {
    const { Fec_OtroMemorando, Mot_OtroMemorando, Id_Aprendiz } = req.body;
    const newMemorandum = await OtrosMemorandumModel.create(
      {
        Fec_OtroMemorando,
        Mot_OtroMemorando,
        Referencia_Id: Id_Aprendiz,
      },
      {
        transaction,
      }
    );
    await transaction.commit();
    if (newMemorandum) {
      res.status(201).json({
        newMemorandum,
        message: "Memorando creado exitosamente!",
      });
      return;
    }
  } catch (error) {
    await transaction.rollback();
    logger.error("Error creating memorandum: ", error);
    res.status(400).json({
      message: "Error al registrar el memorando.",
      error,
    });
  }
};

export const viewOtherMemorandumPdf = async (req, res) => {
  const transacción = await db.transaction();
  const { Id_OtroMemorando } = req.params;

  try {
    const query = `
      SELECT om.Id_OtroMemorando,
             om.Fec_OtroMemorando,
             om.Mot_OtroMemorando,
             om.Referencia_Id,
             a.Id_Aprendiz,
             a.Nom_Aprendiz,
             a.Ape_Aprendiz,
             a.Id_Ficha,  -- Traemos el Id_Ficha desde aprendices
             f.Id_ProgramaFormacion,
             p.Nom_ProgramaFormacion
      FROM otros_memorandos om
      LEFT JOIN aprendices a ON om.Referencia_Id = a.Id_Aprendiz
      LEFT JOIN fichas f ON a.Id_Ficha = f.Id_Ficha
      LEFT JOIN programasformacion p ON f.Id_ProgramaFormacion = p.Id_ProgramaFormacion
      WHERE om.Id_OtroMemorando = :id;
    `;

    const [memorandumPdf] = await db.query(query, {
      replacements: { id: Id_OtroMemorando },
      transaction: transacción,
    });

    if (!memorandumPdf || memorandumPdf.length === 0) {
      throw new Error('Memorando no encontrado');
    }

    const totalMemorandumForApprentice = await getTotalOtrosMemorandumsForAprendiz(
      memorandumPdf[0].Id_Aprendiz
    );

    const totalMemorandums = await getTotalOtrosMemorandums();

    const pdfBase64 = await generateOtroMemorandumPdf(
      memorandumPdf[0],
      totalMemorandums,
      totalMemorandumForApprentice
    );

    await transacción.commit();

    res.status(201).json({
      message: "PDF generado correctamente!",
      data: memorandumPdf[0],
      pdfBase64: pdfBase64,
    });
  } catch (error) {
    await transacción.rollback();
    res.status(404).json({ message: "Ocurrió un error, memorando no encontrado" });
  }
};

export const sendMemorandumPdf = async (req, res) => {
  const transacción = await db.transaction();
  const { Id_OtroMemorando } = req.params;

  try {
    // Obtener la información del memorando
    const memorandumPdf = await OtrosMemorandumModel.findOne({
      where: { Id_OtroMemorando: Id_OtroMemorando },
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
      transaction: transacción,
    });

    if (!memorandumPdf) {
      throw new Error("Memorando no encontrado");
    }

    // Obtener el total de memorandos
    const totalMemorandumForApprentice =
      await getTotalOtrosMemorandumsForAprendiz(
        memorandumPdf.Id_Aprendiz
      );
    const totalMemorandums = await getTotalOtrosMemorandums();
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
    // Generar el PDF en base64
    const pdfBase64 = await generateOtroMemorandumPdf(
      memorandumPdf,
      totalMemorandums,
      totalMemorandumForApprentice,
      trimestreActual,
      año
    );

    // Enviar el memorando por email (pasando el PDF en base64)
    await emailMemorandos({
      Cor_Aprendiz: memorandumPdf.aprendiz?.Cor_Aprendiz,
      Nom_Aprendiz: memorandumPdf.aprendiz?.Nom_Aprendiz,
      Tot_Memorandos: totalMemorandumForApprentice,
      Nom_TalentoHumano: "Monica Talento Humano",
      Nom_ProgramaFormacion:
        memorandumPdf.aprendiz?.fichas?.programasFormacion
          ?.Nom_ProgramaFormacion,
      trimestreActual: trimestreActual,
      añoActual: año,
      pdfBase64: pdfBase64, // Envía el PDF generado en base64 al helper del email
    });

    // Confirmar la transacción
    await transacción.commit();

    // Responder con éxito
    res.status(201).json({
      message: "Memorando enviado correctamente!",
      data: memorandumPdf,
      pdfBase64: pdfBase64,
    });
  } catch (error) {
    // Si ocurre un error, hacer rollback de la transacción
    await transacción.rollback();
    // Enviar el error en la respuesta
    res.status(404).json({
      message: "Ocurrió un error, memorando no encontrado o fallo en el envío",
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

    const plantillaHtml = fs.readFileSync(
      `${raiz}/public/plantillas/plantilla-memorando.html`,
      "utf-8"
    );

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
      .replace("{{totalMemorandumForApprentice}}", totalMemorandumForApprentice) //totalMemorandumForApprentice
      .replace("{{trimestre}}", trimestreActual)
      .replace("{{AnoActual}}", año)
      .replace("{{NombreLider}}", "Daniel Cardenas Lozano")
      .replace("{{TalentoHumano}}", "No tengo la info");

    const options = {
      format: "A4",
      orientation: "portrait",
      border: "10mm",
      timeout: 30000,
      base: "http://localhost:8000",
    };

    pdf.create(htmlContent, options).toBuffer((err, buffer) => {
      if (err) {
        return reject(err);
      }
      const base64 = buffer.toString("base64");
      resolve(base64);
    });
  });
};
