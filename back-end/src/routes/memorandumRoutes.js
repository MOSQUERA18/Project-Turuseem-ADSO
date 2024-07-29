import express from "express";
import {
  getAllMemorandum,
  getMemorandum,
  createMemorandum,
  deleteMemorandum,
  updateMemorandum,
  getQueryMemorandum,
} from "../controller/memorandumController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get("/", checkAuth, getAllMemorandum);
// router.post("/", checkAuth, createMemorandum);
// router.get("/:Id_Memorando", checkAuth, getMemorandum);
// router.put("/:Id_Memorando", checkAuth, updateMemorandum);
// router.delete("/:Id_Memorando", checkAuth, deleteMemorandum);

router
  .route("/")
  .get(checkAuth, getAllMemorandum)
  .post(checkAuth, createMemorandum);
router
  .route("/:Id_Memorando")
  .get(checkAuth, getMemorandum)
  .put(checkAuth, updateMemorandum)
  .delete(checkAuth, deleteMemorandum);
router.get("/codigo/:Id_Memorando", checkAuth, getQueryMemorandum);

export default router;
