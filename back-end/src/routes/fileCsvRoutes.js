import express from "express";
import {
  getAllFileCsvs,
  getFileCsv,
  createFileCsv,
  updateFileCsv,
  deleteFileCsv,
} from "../controller/fileCsvController.js";
import verifyAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getAllFileCsvs)
  .post(verifyAuth, createFileCsv);
router
  .route("/:Id_Archivo_Csv")
  .get(verifyAuth, getFileCsv)
  .put(verifyAuth, updateFileCsv)
  .delete(verifyAuth, deleteFileCsv);

export default router;
