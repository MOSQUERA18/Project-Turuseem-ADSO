import express from "express";
import {
  getAllTurnosEspecialesAprendices,
  getTurnoEspecialAprendiz,
  createTurnoEspecialAprendiz,
  updateTurnoEspecialAprendiz,
  deleteTurnoEspecialAprendiz,
} from "../controller/turnoEspecialAprendizController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getAllTurnosEspecialesAprendices)
  .post(checkAuth, createTurnoEspecialAprendiz);
router
  .route("/:Id_TurnoEspecialAprendiz")
  .get(checkAuth, getTurnoEspecialAprendiz)
  .put(checkAuth, updateTurnoEspecialAprendiz)
  .delete(checkAuth, deleteTurnoEspecialAprendiz);

export default router;
