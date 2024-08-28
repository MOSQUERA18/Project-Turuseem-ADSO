import express from "express";
import {
  getAllTurnosRutinarios,
  getTurnoRutinario,
  createTurnoRutinario,
  updateTurnoRutinario,
  deleteTurnoRutinario,
} from "../controller/turnoRutinarioController.js";
import verifyAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getAllTurnosRutinarios)
  .post(verifyAuth, createTurnoRutinario);
router
  .route("/:Id_TurnoRutinario")
  .get(verifyAuth, getTurnoRutinario)
  .put(verifyAuth, updateTurnoRutinario)
  .delete(verifyAuth, deleteTurnoRutinario);

export default router;
