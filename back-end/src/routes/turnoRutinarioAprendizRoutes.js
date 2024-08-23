import express from "express";
import {
  getAllTurnosRutinariosAprendices,
  getTurnoRutinarioAprendiz,
  createTurnoRutinarioAprendiz,
  updateTurnoRutinarioAprendiz,
  deleteTurnoRutinarioAprendiz,
} from "../controller/turnoRutinarioAprendizController.js";
import verifyAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getAllTurnosRutinariosAprendices)
  .post(verifyAuth, createTurnoRutinarioAprendiz);
router
  .route("/:Id_TurnoRutinarioAprendiz")
  .get(verifyAuth, getTurnoRutinarioAprendiz)
  .put(verifyAuth, updateTurnoRutinarioAprendiz)
  .delete(verifyAuth, deleteTurnoRutinarioAprendiz);

export default router;
