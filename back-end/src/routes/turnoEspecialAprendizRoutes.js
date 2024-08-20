import express from "express";
import {
  getAllTurnosEspecialesAprendices,
  getTurnoEspecialAprendiz,
  createTurnoEspecialAprendiz,
  updateTurnoEspecialAprendiz,
  deleteTurnoEspecialAprendiz,
} from "../controller/turnoEspecialAprendizController.js";
import verifyAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getAllTurnosEspecialesAprendices)
  .post(verifyAuth, createTurnoEspecialAprendiz);
router
  .route("/:Id_TurnoEspecialAprendiz")
  .get(verifyAuth, getTurnoEspecialAprendiz)
  .put(verifyAuth, updateTurnoEspecialAprendiz)
  .delete(verifyAuth, deleteTurnoEspecialAprendiz);

export default router;
