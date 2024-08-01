import db from "../database/db.js";
import { DataTypes } from "sequelize";
import TurnoEspecialModel from "./turnoEspecialModel.js";
import TurnoRutinarioModel from "./turnoRutinarioModel.js"

const AbsenceModel = db.define(
  "inasistencias",
  {
    Id_Inasistencia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Fec_Inasistencia: { type: DataTypes.DATE },
    Mot_Inasistencia: { type: DataTypes.STRING },
    Id_TurnoRutinario_Aprendiz: {
      type: DataTypes.INTEGER,
      references: {
        model: TurnoRutinarioModel,
        key: "Id_TurnoRutinario_Aprendiz",
      },
    },
    Id_TurnoEspecial_Aprendiz: {
      type: DataTypes.INTEGER,
      references: {
        model: TurnoEspecialModel,
        key: "Id_TurnoEspecial_Aprendiz",
      },
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
export default AbsenceModel;
