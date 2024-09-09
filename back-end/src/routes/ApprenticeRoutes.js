
import express from "express";

import multer from "multer";

import {
  createApprentice,
  deleteApprentice,
  getAllApprentices,
  getApprentice,
  updateApprentice,
  importCSV,
} from "../controller/apprenticeController.js";
import checkAuth from "../middleware/authMiddleware.js";
import ApprenticeModel from "../models/apprenticeModel.js";

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

router.put('/:Id_Aprendiz/actualizar-inasistencia', async (req, res) => {
    try {
      const { Id_Aprendiz } = req.params;
      const { action } = req.body;
  
      console.log("Actualizando inasistencia para aprendiz con ID:", Id_Aprendiz); 
      console.log("Acción:", action); 
  
      const aprendiz = await ApprenticeModel.findByPk(Id_Aprendiz);
  
      if (!aprendiz) {
        return res.status(404).json({ error: 'Aprendiz no encontrado' });
      }
  
      if (action === "incrementar") {
        // Solo incrementar memorandos cuando la acción sea "incrementar"
        aprendiz.Tot_Inasistencias += 1;
        aprendiz.Tot_Memorandos += 1;
      } else if (action === "decrementar" && aprendiz.Tot_Inasistencias > 0) {
        // No decrementamos memorandos, solo inasistencias
        aprendiz.Tot_Inasistencias -= 1;
        aprendiz.Tot_Memorandos -= 1;
      } else {
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
  
  
// Ruta para importar CSV de aprendices
router.post("/import-csv", checkAuth, upload.single('file'), importCSV);

export default router;