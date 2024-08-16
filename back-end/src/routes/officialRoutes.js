import express from "express";
import {
  getAllFuncionarios,
  getFuncionario,
  createFuncionario,
  updateFuncionario,
  deleteFuncionario,
} from "../controller/officialController.js";
import verifyAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getAllFuncionarios)
  .post(verifyAuth, createFuncionario);
router
  .route("/:Id_Funcionario")
  .get(verifyAuth, getFuncionario)
  .put(verifyAuth, updateFuncionario)
  .delete(verifyAuth, deleteFuncionario);

export default router;
