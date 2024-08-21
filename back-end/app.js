import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

import db from "./src/database/db.js";

//Routes
import absenceRoutes from "./src/routes/absencesRoutes.js";
import apprenticeRoutes from "./src/routes/ApprenticeRoutes.js";
import areaRoutes from "./src/routes/areaRoutes.js";
import fichasRoutes from "./src/routes/fichasRoutes.js";
import fileCsvRoutes from "./src/routes/fileCsvRoutes.js";
import memorandumRoutes from "./src/routes/memorandumRoutes.js";
import officialRoutes from "./src/routes/officialRoutes.js";
import programaRoutes from "./src/routes/programaRoutes.js";
import talentoHumanoRoutes from "./src/routes/talentoHumanoRoutes.js";
import turnoEspecialAprendizRoutes from "./src/routes/turnoEspecialAprendizRoutes.js";
import turnoRutinarioAprendizRoutes from "./src/routes/turnoRutinarioAprendizRoutes.js";
import turnoRutinarioRoutes from "./src/routes/turnoRutinarioRoutes.js";
import turnoEspecialRoutes from "./src/routes/turnoEspecialRoutes.js"
import unitRoutes from './src/routes/unitRoutes.js'
import userRouter from "./src/routes/UserRoutes.js";
import { logger } from "./src/middleware/logMiddleware.js";
// import routespdf from "./src/routes/routespdf.js";

//Models
import TalentoHumanoModel from "./src/models/talentoHumano.js";
import UnitModel from "./src/models/unitModel.js";
import AreaModel from "./src/models/areaModel.js";
import ProgramaModel from "./src/models/programaModel.js";
import FichasModel from "./src/models/fichasModel.js";
import AbsenceModel from "./src/models/absenceModel.js";
import TurnoEspecialAprendizModel from "./src/models/turnoEspeciales_Aprendices.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use("/inasistencias", absenceRoutes);
app.use("/aprendiz", apprenticeRoutes);
app.use("/areas", areaRoutes);
app.use("/fichas", fichasRoutes);
app.use("/fileCsv", fileCsvRoutes);
app.use("/memorando", memorandumRoutes);
app.use("/funcionarios", officialRoutes);
app.use("/programa", programaRoutes);
app.use("/talentohumano", talentoHumanoRoutes);
app.use("/turEspAprendiz", turnoEspecialAprendizRoutes);
app.use("/turnoespecial",turnoEspecialRoutes)
app.use("/turRutAprendiz", turnoRutinarioAprendizRoutes);
app.use("/turnoRutinario", turnoRutinarioRoutes);
app.use('/unidades', unitRoutes)

app.use("/api/user", userRouter);

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

//Unidades
AreaModel.hasMany(UnitModel, { foreignKey: "Id_Area", as: "unidades" })
UnitModel.belongsTo(AreaModel, { foreignKey: "Id_Area", as: "areas" })

//Programas de formacion
AreaModel.hasMany(ProgramaModel, { foreignKey: "Id_Area", as: "programasformacion" })
ProgramaModel.belongsTo(AreaModel, { foreignKey: "Id_Area", as: "areas"})


//Fichas
ProgramaModel.hasMany(FichasModel, { foreignKey: "Id_ProgramaFormacion", as:"fichas" })
FichasModel.belongsTo(ProgramaModel,{foreignKey:"Id_ProgramaFormacion",as:"programasFormacion"})


//TalentoHumano
FichasModel.hasMany(TalentoHumanoModel,{foreignKey:"Id_Ficha",as:"talentoHumano"})
TalentoHumanoModel.belongsTo(FichasModel,{foreignKey:"Id_Ficha",as:"ficha"})
// console.log("TalentoHumanoModel")
// console.log(TalentoHumanoModel)


//Inasistencias
AbsenceModel.belongsTo(TurnoEspecialAprendizModel,{foreignKey:"Id_TurnoEspecialAprendiz", as:"turnoespecialaprendiz"})
TurnoEspecialAprendizModel.hasMany(AbsenceModel,{foreignKey:"Id_TurnoEspecialAprendiz",as:"inasistencias"})

//Funcionario No esta relacionado con ninguno sino hasta con Turno Especial....

export { AreaModel, UnitModel, ProgramaModel,FichasModel,TalentoHumanoModel } 