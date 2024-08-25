import express from "express";
import {
  getAllTurnosRutinarios,
  getTurnoRutinario,
  createTurnoRutinario,
  updateTurnoRutinario,
  deleteTurnoRutinario,
} from "../controller/turnoRutinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getAllTurnosRutinarios)
  .post(checkAuth, createTurnoRutinario);
router
  .route("/:Id_TurnoRutinario")
  .get(checkAuth, getTurnoRutinario)
  .put(checkAuth, updateTurnoRutinario)
  .delete(checkAuth, deleteTurnoRutinario);

export default router;
