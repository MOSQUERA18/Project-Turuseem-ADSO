import express from "express";
import {
  getAllTalentoHumano,
  getTalentoHumano,
  createTalentoHumano,
  updateTalentoHumano,
  deleteTalentoHumano,
} from "../controller/talentoHumanoController.js";
import verifyAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getAllTalentoHumano)
  .post(verifyAuth, createTalentoHumano);
router
  .route("/:Id_Talento_Humano")
  .get(verifyAuth, getTalentoHumano)
  .put(verifyAuth, updateTalentoHumano)
  .delete(verifyAuth, deleteTalentoHumano);

export default router;
