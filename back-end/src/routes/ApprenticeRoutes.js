import express from "express";
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

router
  .route("/")
  .get(checkAuth, getAllApprentices)
  .post(checkAuth, createApprentice);
router
  .route("/:Id_Aprendiz")
  .get(checkAuth, getApprentice)
  .put(checkAuth, updateApprentice)
  .delete(checkAuth, deleteApprentice);
router.get("/documento/:Id_Aprendiz", checkAuth, getQueryApprentice);
router.get("/nombre/:Nom_Aprendiz", checkAuth, getQueryNom_Apprentice);
router.post("/import-csv", checkAuth, importCSV);

export default router;