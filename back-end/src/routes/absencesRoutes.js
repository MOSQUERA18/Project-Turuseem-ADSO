import express from "express";
import {
  getAllAbsences,
  getAbsence,
  createAbsence,
  updateAbsence,
  deleteAbsence,
} from "../controller/absencesController.js";
import verifyAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getAllAbsences)
  .post(verifyAuth, createAbsence);
router
  .route("/:Id_Inasistencia")
  .get(verifyAuth, getAbsence)
  .put(verifyAuth, updateAbsence)
  .delete(verifyAuth, deleteAbsence);

export default router;
