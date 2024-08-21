import { logger } from "../middleware/logMiddleware.js";
import TalentoHumanoModel from "../models/talentoHumano.js";
import FichasModel from "../models/fichasModel.js";

export const getAllTalentoHumano = async (req, res) => {
  try {
    const talentoHumano = await TalentoHumanoModel.findAll({
      include: [{ model: FichasModel, as: 'fichas' }]
    });
    if (talentoHumano) {
      res.status(200).json(talentoHumano);
      return
    } else {
      res.status(404).json({
        message: "No se encontró talento humano.",
      });
    }
  } catch (error) {
    logger.error("Error fetching talento humano: ", error.message);
    res.status(500).json({
      message: "Error al recuperar el talento humano.",
    });
  }
};

export const getTalentoHumano = async (req, res) => {
  try {
    const talento = await TalentoHumanoModel.findOne({
      where: { Id_Talento_Humano: req.params.Id_Talento_Humano },
      include: [{ model: FichasModel, as: 'fichas' }]
    });
    if (talento) {
      res.status(200).json(talento);
      return
    } else {
      res.status(404).json({
        message: "Talento humano no encontrado.",
      });
    }
  } catch (error) {
    logger.error("Error fetching talento humano: ", error.message);
    res.status(500).json({
      message: "Error al recuperar el talento humano.",
    });
  }
};

export const createTalentoHumano = async (req, res) => {
  try {
    const newTalento = await TalentoHumanoModel.create(req.body);
    res.status(201).json({
      message: "Talento humano registrado correctamente!",
      data: newTalento,
    });
    return
  } catch (error) {
    logger.error("Error creating talento humano: ", error.message);
    res.status(400).json({
      message: "Error al registrar el talento humano.",
      error: error.message,
    });
  }
};

export const updateTalentoHumano = async (req, res) => {
  try {
    const [updated] = await TalentoHumanoModel.update(req.body, {
      where: { Id_Talento_Humano: req.params.Id_Talento_Humano },
    });
    if (updated) {
      res.json({
        message: "Talento humano actualizado correctamente!",
      });
      return
    } else {
      res.status(404).json({
        message: "Talento humano no encontrado.",
      });
    }
  } catch (error) {
    logger.error("Error updating talento humano: ", error.message);
    res.status(400).json({
      message: "Error al actualizar el talento humano.",
      error: error.message,
    });
  }
};

export const deleteTalentoHumano = async (req, res) => {
  try {
    const deleted = await TalentoHumanoModel.destroy({
      where: { Id_Talento_Humano: req.params.Id_Talento_Humano },
    });
    if (deleted) {
      res.json({
        message: "Talento humano borrado correctamente!",
      });
      return
    } else {
      res.status(404).json({
        message: "Talento humano no encontrado.",
      });
    }
  } catch (error) {
    logger.error("Error deleting talento humano: ", error.message);
    res.status(400).json({
      message: "Error al borrar el talento humano.",
      error: error.message,
    });
  }
};


// export const getQueryTalento = async (req, res) => {
//   try {
//     const talento = await TalentoHumanoModel.findAll({
//       where: {
//         Id_Talento_Humano: {
//           [Op.like]: `%${req.params.Id_Talento_Humano}%`,
//         },
//       },
//       include: [
//         {
//           model: FichasModel,
//           as: "fichas", // Asegúrate de que el alias coincida con tu modelo
//         },
//       ],
//     });
//     if (talento) {
//       res.status(200).json(talento);
//       return
//     } else {
//       res.status(404).json({ message: "No se encontraron Personas(Talento Humano) con el Documento proporcionado." });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//     logger.error(`Error al buscar el Talento Humano: ${error}`);
//   }
// };