import express from "express";
import {
  getAllProgramas,
  getPrograma,
  createPrograma,
  updatePrograma,
  deletePrograma,
  getQueryNom_Programa
} from "../controller/programaController.js";
import verifyAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getAllProgramas)
  .post(verifyAuth, createPrograma);
router
  .route("/:Id_ProgramaFormacion")
  .get(verifyAuth, getPrograma)
  .put(verifyAuth, updatePrograma)
  .delete(verifyAuth, deletePrograma);
router.get('/nombre/:Nom_ProgramaFormacion',verifyAuth, getQueryNom_Programa);

export default router;