import db from "../database/db.js";
import { DataTypes } from "sequelize";
import ApprenticeModel from "./apprenticeModel.js";

const OtrosMemorandumModel = db.define(
  "otros_memorandos",
  {
    Id_OtroMemorando: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Fec_OtroMemorando: { type: DataTypes.DATE },
    Mot_OtroMemorando: { type: DataTypes.STRING(40) },
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
