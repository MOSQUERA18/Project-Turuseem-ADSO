
import express from "express";

import multer from "multer";

import {
  createApprentice,
  deleteApprentice,
  getAllApprentices,
  getApprentice,
  updateApprentice,
  importCSV

} from "../controller/apprenticeController.js";
import checkAuth from "../middleware/authMiddleware.js";
import ApprenticeModel from "../models/apprenticeModel.js";
import Otros_MemorandosModel from "../models/Otros_MemorandosModel.js"

const router = express.Router();


const upload = multer({ 
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/') // Asegúrate de que este directorio exista
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
});

router
  .route("/")
  .get(checkAuth, getAllApprentices)
  .post(checkAuth,upload.single('Foto_Aprendiz'), createApprentice);
router
  .route("/:Id_Aprendiz")
  .get(checkAuth, getApprentice)
  .put(upload.single('Foto_Aprendiz'), updateApprentice)
  .delete(checkAuth, deleteApprentice);

// Ruta para actualizar inasistencias y eliminar memorandos si es necesario
router.put('/actualizar-inasistencia/:Id_Aprendiz', async (req, res) => {
  try {
      const { Id_Aprendiz } = req.params;
      const { action } = req.body;
      // console.log(req)
      // console.log("Actualizando inasistencia para aprendiz con ID:", Id_Aprendiz);
      // console.log("Acción:", action);

      const aprendiz = await ApprenticeModel.findByPk(Id_Aprendiz);

      if (!aprendiz) {
          return res.status(404).json({ error: 'Aprendiz no encontrado' });
      }

      if (action === "incrementar") {
        // Incrementar memorandos e inasistencias
        console.log("Modo Incrementar:" ,action);
        
        aprendiz.Tot_Inasistencias += 1;
        aprendiz.Tot_Memorandos += 1;
        console.log("Acción recibida:", action); // Debe mostrar "incrementar" o "decrementar"

    }else if (action === "decrementar" && aprendiz.Tot_Inasistencias > 0) {
      console.log("Modo decrementar");
      aprendiz.Tot_Inasistencias = parseInt(aprendiz.Tot_Inasistencias) - 1;
      aprendiz.Tot_Memorandos = parseInt(aprendiz.Tot_Memorandos) - 1;
      console.log("Valores después de decrementar:", aprendiz.Tot_Inasistencias, aprendiz.Tot_Memorandos);
      await eliminarMemorando(Id_Aprendiz)
    }else {
        return res.status(400).json({ error: 'Acción inválida o inasistencias en 0' });
    }

      await aprendiz.save();
      console.log("Inasistencia actualizada exitosamente");

      res.status(200).json({ message: 'Inasistencia actualizada exitosamente', aprendiz });
  } catch (error) {
      console.error("Error al actualizar inasistencia:", error);
      res.status(500).json({ error: 'Error al actualizar la inasistencia' });
  }
});

// Función para eliminar el memorando cuando el indicador de asistencia sea "Si"
const eliminarMemorando = async (Id_Aprendiz) => {
  try {
      // Buscar y eliminar memorando asociado al aprendiz
      const memorando = await Otros_MemorandosModel.findOne({
          where: { Id_Aprendiz }
      });

      if (memorando) {
          await memorando.destroy();
          console.log(`Memorando para el aprendiz con ID ${Id_Aprendiz} eliminado exitosamente`);
      } else {
          console.log(`No se encontró memorando para el aprendiz con ID ${Id_Aprendiz}`);
      }
  } catch (error) {
      console.error("Error al eliminar memorando:", error);
  }
};

  
  
// Ruta para importar CSV de aprendices
router.post("/import-csv", checkAuth, upload.single('file'), importCSV);

export default router;