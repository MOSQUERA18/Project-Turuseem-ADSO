import { logger } from "../middleware/logMiddleware.js";
import UnitModel from "../models/unitModel.js";
import AreaModel from "../models/areaModel.js";
import { Sequelize, Op } from "sequelize";

export const getAllUnits = async (req, res) => {
  try {
    // Intento de obtener todas las unidades, incluyendo las áreas relacionadas.
    const units = await UnitModel.findAll({
      include: [
        {
          model: AreaModel,
          as: "areas",
        },
      ],
    });

    // Verifico si se encontraron unidades.
    if (units.length > 0) {
      res.status(200).json(units);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "No se encontraron unidades.",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la consulta.
    logger.error("Error fetching units: ", error.message);
    res.status(500).json({
      message: "Error al recuperar las unidades.",
    });
  }
};

export const getUnit = async (req, res) => {
  try {
    // Intento de obtener una unidad específica por ID, incluyendo las áreas relacionadas.
    const unit = await UnitModel.findByPk(req.params.Id_Unidad, {
      include: [
        {
          model: AreaModel,
          as: "areas",
        },
      ],
    });

    // Verifico si se encontró la unidad.
    if (unit) {
      res.status(200).json(unit);
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "Unidad no encontrada.",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la consulta.
    logger.error("Error fetching unit: ", error.message);
    res.status(500).json({
      message: "Error al recuperar la unidad.",
    });
  }
};

export const createUnit = async (req, res) => {
  try {
    // Intento de crear una nueva unidad con los datos proporcionados en el cuerpo de la solicitud.
    const newUnit = await UnitModel.create(req.body);

    // Respuesta exitosa con los datos de la nueva unidad.
    res.status(201).json({
      status: 'success',
      message: 'Unidad registrada correctamente!',
      data: {
        id: newUnit.id,
        name: newUnit.name,
        // Agrega otros campos que quieras mostrar
      },
    });
    return; // Uso de return para salir de la función después de enviar la respuesta.
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la creación.
    logger.error("Error creating unit: ", error.message);
    res.status(400).json({
      status: 'error',
      message: 'Error al registrar la unidad.',
      error: error.message,
    });
  }
};

export const updateUnit = async (req, res) => {
  try {
    // Intento de actualizar una unidad específica por ID con los datos proporcionados en el cuerpo de la solicitud.
    const [updated] = await UnitModel.update(req.body, {
      where: { Id_Unidad: req.params.Id_Unidad },
    });

    // Verifico si se realizó alguna actualización.
    if (updated) {
      res.json({
        message: "Unidad actualizada correctamente!",
      });
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "Unidad no encontrada.",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la actualización.
    logger.error("Error updating unit: ", error.message);
    res.status(400).json({
      message: "Error al actualizar la unidad.",
      error: error.message,
    });
  }
};

export const deleteUnit = async (req, res) => {
  try {
    // Intento de eliminar una unidad específica por ID.
    const deleted = await UnitModel.destroy({
      where: { Id_Unidad: req.params.Id_Unidad },
    });

    // Verifico si se realizó la eliminación.
    if (deleted) {
      res.json({
        message: "Unidad borrada correctamente!",
      });
      return; // Uso de return para salir de la función después de enviar la respuesta.
    } else {
      res.status(404).json({
        message: "Unidad no encontrada.",
      });
    }
  } catch (error) {
    // Capturo y manejo cualquier error ocurrido durante la eliminación.
    logger.error("Error deleting unit: ", error.message);
    res.status(400).json({
      message: "Error al borrar la unidad.",
      error: error.message,
    });
  }
};


// export const getQueryNom_Unit = async (req, res) => {
//   try {
//     const units = await UnitModel.findAll({
//       where: {
//         Nom_Unidad: {
//           [Sequelize.Op.like]: `%${req.params.Nom_Unidad}%`,
//         },
//       },
//       include: [
//         {
//           model: AreaModel,
//           as: "areas",
//           attributes: ["Nom_Area"], // Incluye el nombre del área
//         },
//       ],
//     });

//     if (units.length > 0) {
//       res.status(200).json(units);
//       return
//     } else {
//       res.status(404).json({
//         message: "No se encontraron unidades que coincidan con la búsqueda.",
//       });
//     }
//   } catch (error) {
//     logger.error("Error searching units: ", error.message);
//     console.log(error)
//     res.status(500).json({
//       message: "Error al buscar las unidades.",
//     });
//   }
// };
