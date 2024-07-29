import express from "express";
import {
  createApprentice,
  deleteApprentice,
  getAllApprentice,
  getApprentice,
  updateApprentice,
  getQueryApprentice,
  getQueryNom_Apprentice,
  importCSV,
} from "../controller/apprenticeController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

//Routes for module apprentice
// router.get("/", checkAuth, getAllApprentice);
// router.post("/", checkAuth, createApprentice);
// router.get("/:Id_Aprendiz", checkAuth, getApprentice);
// router.put("/:Id_Aprendiz", checkAuth, updateApprentice);
// router.delete("/:Id_Aprendiz", checkAuth, deleteApprentice);

router
  .route("/")
  .get(checkAuth, getAllApprentice)
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
