import express from "express";
import {
  getAllUnits,
  getUnit,
  createUnit,
  updateUnit,
  deleteUnit,
  getQueryUnit,
} from "../controller/unitControllers.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getAllUnits)
  // .get(checkAuth,getQueryUnit)
  .post(checkAuth, createUnit);
router
  .route("/:Id_Unidad")
  .get(checkAuth, getUnit)
  .put(checkAuth, updateUnit)
  .delete(checkAuth, deleteUnit);

  router.get("/:Nom_Unidad", checkAuth, getQueryUnit);

export default router;
