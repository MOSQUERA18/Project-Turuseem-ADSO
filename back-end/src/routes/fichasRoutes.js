import express from "express";
import {
  getAllFichas,
  getFicha,
  createFicha,
  updateFicha,
  deleteFicha,
  getQueryFicha
} from "../controller/fichasController.js";
import verifyAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getAllFichas)
  .post(verifyAuth, createFicha);
router
  .route("/:Id_Ficha")
  .get(verifyAuth, getFicha)
  .put(verifyAuth, updateFicha)
  .delete(verifyAuth, deleteFicha);
router.get("/codFicha/:Id_Ficha",verifyAuth, getQueryFicha)

export default router;
