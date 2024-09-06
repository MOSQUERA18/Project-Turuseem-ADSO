import db from "../database/db.js";
import { DataTypes} from "sequelize";
import TurnoRutinarioModel from "./turnoRutinarioModel.js"

const AbsenceModel = db.define(
  "inasistencias",
  {
    Id_Inasistencia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Fec_Inasistencia : {type: DataTypes.TIME},
    Mot_Inasistencia: { type: DataTypes.STRING(50) },
    Id_TurnoRutinario: {
      type: DataTypes.INTEGER,
      references: {
        model: TurnoRutinarioModel,
        key: "Id_TurnoRutinario",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
export default AbsenceModel;
