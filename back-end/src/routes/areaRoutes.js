import express from "express";
import {getAllAreas} from "../controller/areaController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, getAllAreas)

export default router;
