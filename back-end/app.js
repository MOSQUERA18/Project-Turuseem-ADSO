import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { app, BrowserWindow } from "electron";

import db from "./src/database/db.js";

//Routes
import absenceRoutes from "./src/routes/absencesRoutes.js";
import cityRoutes from "./src/routes/cityRoutes.js"
import apprenticeRoutes from "./src/routes/ApprenticeRoutes.js";
import areaRoutes from "./src/routes/areaRoutes.js";
import fichasRoutes from "./src/routes/fichasRoutes.js";
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
import cityModel from "./src/models/cityModel.js";
import ApprenticeModel from "./src/models/apprenticeModel.js";
import TalentoHumanoModel from "./src/models/talentoHumano.js";
import UnitModel from "./src/models/unitModel.js";
import AreaModel from "./src/models/areaModel.js";
import ProgramaModel from "./src/models/programaModel.js";
import FichasModel from "./src/models/fichasModel.js";
import AbsenceModel from "./src/models/absenceModel.js";
import TurnoEspecialAprendizModel from "./src/models/turnoEspeciales_Aprendices.js";
import TurnoEspecialModel from "./src/models/turnoEspecialModel.js";
import OfficialModel from "./src/models/officialModel.js";

// const createWindow = () => {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600
//   })

//   win.loadURL('http://localhost:5173/')
// }

// app.whenReady().then(() => {
//   createWindow()
// })

const appExpress = express();
const PORT = process.env.PORT || 8080;

appExpress.use(cors());
appExpress.use(express.json());
appExpress.use("/inasistencias", absenceRoutes);
appExpress.use("/aprendiz", apprenticeRoutes);
appExpress.use("/areas", areaRoutes);
appExpress.use("/fichas", fichasRoutes);
appExpress.use("/memorando", memorandumRoutes);
appExpress.use("/funcionarios", officialRoutes);
appExpress.use("/programa", programaRoutes);
appExpress.use("/talentohumano", talentoHumanoRoutes);
appExpress.use("/turEspAprendiz", turnoEspecialAprendizRoutes);
appExpress.use("/turnoespecial",turnoEspecialRoutes)
appExpress.use("/turRutAprendiz", turnoRutinarioAprendizRoutes);
appExpress.use("/turnoRutinario", turnoRutinarioRoutes);
appExpress.use('/unidades', unitRoutes)
appExpress.use('/ciudades', cityRoutes)


appExpress.use('/public/uploads/', express.static('public/uploads'))

appExpress.use("/api/user", userRouter);

try {
  await db.authenticate().then(() => {
    console.log("Conexion a la db exitosa");
  });
} catch (error) {
  console.log(`Error de conexion a la bd ${error}`);
  logger.error(error);
}

appExpress.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//Unidades
AreaModel.hasMany(UnitModel, { foreignKey: "Id_Area", as: "unidades" })
UnitModel.belongsTo(AreaModel, { foreignKey: "Id_Area", as: "areas" })

//Programas de formacion
AreaModel.hasMany(ProgramaModel, { foreignKey: "Id_Area", as: "programasFormacion" })
ProgramaModel.belongsTo(AreaModel, { foreignKey: "Id_Area", as: "areas"})


//Fichas
ProgramaModel.hasMany(FichasModel, { foreignKey: "Id_ProgramaFormacion", as:"fichas" })
FichasModel.belongsTo(ProgramaModel,{foreignKey:"Id_ProgramaFormacion",as:"programasFormacion"})


//TalentoHumano
FichasModel.hasMany(TalentoHumanoModel,{foreignKey:"Id_Ficha",as:"talentoHumano"})
TalentoHumanoModel.belongsTo(FichasModel,{foreignKey:"Id_Ficha",as:"fichas"})


//APRENDIZ CON FICHAS
FichasModel.hasMany(ApprenticeModel,{foreignKey:'Id_Ficha' , as : 'aprendices'})
ApprenticeModel.belongsTo(FichasModel,{foreignKey:'Id_Ficha', as:'fichas'})


//Aprendiz con Ciudad
cityModel.hasMany(ApprenticeModel,{foreignKey:'Id_Ciudad', as:'aprendices'})
ApprenticeModel.belongsTo(cityModel,{foreignKey:'Id_Ciudad',as:'ciudad'})


//Inasistencias
AbsenceModel.belongsTo(TurnoEspecialAprendizModel,{foreignKey:"Id_TurnoEspecialAprendiz", as:"turnoespecialaprendiz"})
TurnoEspecialAprendizModel.hasMany(AbsenceModel,{foreignKey:"Id_TurnoEspecialAprendiz",as:"inasistencias"})


//Turno Especial - Fichas
FichasModel.hasMany(TurnoEspecialModel,{foreignKey:"Id_Ficha",as:"turnoEspecial"})
TurnoEspecialModel.belongsTo(FichasModel,{foreignKey:"Id_Ficha",as:"fichas"})

//Turno Especial - Unidades
UnitModel.hasMany(TurnoEspecialModel,{foreignKey:"Id_Unidad",as:"turnoEspecial"})
TurnoEspecialModel.belongsTo(UnitModel,{foreignKey:"Id_Unidad",as:"unidad"})

//Turno Especial - Funcionarios
OfficialModel.hasMany(TurnoEspecialModel,{foreignKey:"Id_Funcionario",as:"turnoEspecial"})
TurnoEspecialModel.belongsTo(OfficialModel,{foreignKey:"Id_Funcionario",as:"funcionario"})

//Funcionario No esta relacionado con ninguno sino hasta con Turno Especial....

export { AreaModel, UnitModel, ProgramaModel,FichasModel,TalentoHumanoModel,cityModel,ApprenticeModel } 