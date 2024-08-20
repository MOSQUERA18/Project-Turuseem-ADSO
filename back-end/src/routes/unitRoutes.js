import express from "express";
import {
  getAllUnits,
  getUnit,
  createUnit,
  updateUnit,
  deleteUnit,
  getQueryNom_Unit,
} from "../controller/unitControllers.js";
import verifyAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getAllUnits)
  // .get(verifyAuth,getQueryUnit)
  .post(verifyAuth, createUnit);
router
  .route("/:Id_Unidad")
  .get(verifyAuth, getUnit)
  .put(verifyAuth, updateUnit)
  .delete(verifyAuth, deleteUnit);

  router.get("/nombre/:Nom_Unidad", verifyAuth, getQueryNom_Unit);

export default router;
