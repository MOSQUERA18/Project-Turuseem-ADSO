
import express from "express";

import multer from "multer";

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
import checkAuth from "../middleware/authMiddleware.js";

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
router.get("/documento/:Id_Aprendiz", checkAuth, getQueryApprentice);
router.get("/nombre/:Nom_Aprendiz", checkAuth, getQueryNom_Apprentice);
router.post("/import-csv", checkAuth, importCSV);

export default router;