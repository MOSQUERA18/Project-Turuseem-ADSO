import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
// import expressSession from 'express-session';

import db from "./src/database/db.js";
import apprenticeRoutes from "./src/routes/ApprenticeRoutes.js";
import memorandumRoutes from "./src/routes/memorandumRoutes.js";
import userRouter from "./src/routes/UserRoutes.js";
import programaRoutes from "./src/routes/programaRoutes.js";
import chargesRoutes from './src/routes/chargesRoutes.js'
import { logger } from "./src/middleware/logMiddleware.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use("/api/user", userRouter);
app.use("/aprendiz", apprenticeRoutes);
app.use("/memorando", memorandumRoutes);
app.use("/programa", programaRoutes);
app.use('/cargos', chargesRoutes);

try {
  await db.authenticate().then(() => {
    console.log("Conexion a la db exitosa");
  });
} catch (error) {
  console.log(`Error de conexion a la bd ${error}`);
  logger.error(error);
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
