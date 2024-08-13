import express from "express";
import {
  getAllFichas,
  getFicha,
  createFicha,
  updateFicha,
  deleteFicha,
  getQueryFicha
} from "../controller/fichasController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getAllFichas)
  .post(checkAuth, createFicha);
router
  .route("/:Id_Ficha")
  .get(checkAuth, getFicha)
  .put(checkAuth, updateFicha)
  .delete(checkAuth, deleteFicha);
router.get("/codFicha/:Id_Ficha", getQueryFicha)

export default router;
