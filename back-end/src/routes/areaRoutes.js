import express from "express";
import {getAllAreas} from "../controller/areaController.js";
import verifyAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getAllAreas)

export default router;
