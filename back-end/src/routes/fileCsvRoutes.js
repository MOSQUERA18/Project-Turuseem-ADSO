import express from "express";
import {
  getAllFileCsvs,
  getFileCsv,
  createFileCsv,
  updateFileCsv,
  deleteFileCsv,
} from "../controller/fileCsvController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getAllFileCsvs)
  .post(checkAuth, createFileCsv);
router
  .route("/:Id_Archivo_Csv")
  .get(checkAuth, getFileCsv)
  .put(checkAuth, updateFileCsv)
  .delete(checkAuth, deleteFileCsv);

export default router;
