import db from "../database/db.js";
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import AbsenceModel from "./absenceModel.js";
import ApprenticeModel from "./apprenticeModel.js";

const OtrosMemorandumModel = db.define(
  "memorandos",
  {
    Id_Memorando: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Fec_Memorando: { type: DataTypes.DATE },
    Mot_Memorando: { type: DataTypes.STRING(40) },
    Id_Aprendiz: {
      type: DataTypes.INTEGER,
      references: {
        model: ApprenticeModel,
        key: "Id_Aprendiz",
      },
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  {
    freezeTableName: true,
  }
);

export default OtrosMemorandumModel;
