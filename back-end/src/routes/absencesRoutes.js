import express from "express";
import {
  getAllAbsences,
  getAbsence,
  createAbsence,
  updateAbsence,
  deleteAbsence,
} from "../controller/absencesController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getAllAbsences)
  .post(checkAuth, createAbsence);
router
  .route("/:Id_Inasistencia")
  .get(checkAuth, getAbsence)
  .put(checkAuth, updateAbsence)
  .delete(checkAuth, deleteAbsence);

export default router;
