import express from "express";

import multer from "multer";
import path from 'path'

import {
  createApprentice,
  deleteApprentice,
  getAllApprentices,
  getApprentice,
  updateApprentice,
  getQueryApprentice,
  getQueryNom_Apprentice,
  importCSV,
} from "../controller/apprenticeController.js";
import verifyAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// Configura multer para manejar el almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Limita a 5MB, por ejemplo
});
  


router
  .route("/")
  .get(verifyAuth, getAllApprentices)
  .post(verifyAuth,upload.single('Foto_Aprendiz'), createApprentice);
router
  .route("/:Id_Aprendiz")
  .get(verifyAuth, getApprentice)
  .put(verifyAuth,upload.single('Foto_Aprendiz'), updateApprentice)
  .delete(verifyAuth, deleteApprentice);
router.get("/documento/:Id_Aprendiz", verifyAuth, getQueryApprentice);
router.get("/nombre/:Nom_Aprendiz", verifyAuth, getQueryNom_Apprentice);
router.post("/import-csv", verifyAuth, importCSV);

export default router;
