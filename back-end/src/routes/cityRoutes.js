import express from "express";
import { getAllCities } from "../controller/cityController.js";
import verifyAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getAllCities)

export default router;