import express from "express";
import {
  getAllFuncionarios,
  getFuncionario,
  createFuncionario,
  updateFuncionario,
  deleteFuncionario,
  getQueryFuncionario
} from "../controller/officialController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getAllFuncionarios)
  .post(checkAuth, createFuncionario);
router
  .route("/:Id_Funcionario")
  .get(checkAuth, getFuncionario)
  .put(checkAuth, updateFuncionario)
  .delete(checkAuth, deleteFuncionario);
  router.get("/document/:Id_Funcionario", checkAuth, getQueryFuncionario)

export default router;
