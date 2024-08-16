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
import verifyAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getAllApprentices)
  .post(verifyAuth, createApprentice);
router
  .route("/:Id_Aprendiz")
  .get(verifyAuth, getApprentice)
  .put(verifyAuth, updateApprentice)
  .delete(verifyAuth, deleteApprentice);
router.get("/documento/:Id_Aprendiz", verifyAuth, getQueryApprentice);
router.get("/nombre/:Nom_Aprendiz", verifyAuth, getQueryNom_Apprentice);
router.post("/import-csv", verifyAuth, importCSV);

export default router;
