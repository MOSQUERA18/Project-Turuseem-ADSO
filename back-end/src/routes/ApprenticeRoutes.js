import fs from 'fs';
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
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//   console.log("desinatario")

//   console.log(req)


//       cb(null, 'public/uploads/');
//   },
//   filename: (req, file, cb) => {
//   console.log("filename")

//   console.log(req)

//       cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'public/uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 } // Limita a 5MB, por ejemplo
// });
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

  

// const upload = multer();


router
  .route("/")
  .get(verifyAuth, getAllApprentices)
  .post(verifyAuth,async (req,res, next)=>{
    console.log(req)
    next()
  },upload.single('Foto_Aprendiz'), createApprentice);
router
  .route("/:Id_Aprendiz")
  .get(verifyAuth, getApprentice)
  .put(verifyAuth,upload.single('Foto_Aprendiz'), updateApprentice)
  .delete(verifyAuth, deleteApprentice);
router.get("/documento/:Id_Aprendiz", verifyAuth, getQueryApprentice);
router.get("/nombre/:Nom_Aprendiz", verifyAuth, getQueryNom_Apprentice);
router.post("/import-csv", verifyAuth, importCSV);

export default router;
