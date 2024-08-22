import express from "express";
import {
  getAllFileCsvs,
  getFileCsv,
  deleteFileCsv,
} from "../controller/fileCsvController.js";
import verifyAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getAllFileCsvs)
router
  .route("/:Id_Archivo_Csv")
  .get(verifyAuth, getFileCsv)
  .delete(verifyAuth, deleteFileCsv);

export default router;