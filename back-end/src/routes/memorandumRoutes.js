import express from "express";
import {
  getAllMemorandum,
  getMemorandum,
  createMemorandum,
  updateMemorandum,
  deleteMemorandum,
  getQueryMemorandum,
} from "../controller/memorandumController.js";
import verifyAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getAllMemorandum)
  .post(verifyAuth, createMemorandum);
router
  .route("/:Id_Memorando")
  .get(verifyAuth, getMemorandum)
  .put(verifyAuth, updateMemorandum)
  .delete(verifyAuth, deleteMemorandum);
router.get("/query/:Id_Memorando", verifyAuth, getQueryMemorandum);

export default router;
