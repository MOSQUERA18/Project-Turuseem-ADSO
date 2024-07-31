import db from "../database/db.js";
import { DataTypes } from "sequelize";
import AreaModel from "./areaModel.js";

const ProgramaModel = db.define(
  "programasformacion",
  {
    Id_Programa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    Nom_Programa: { type: DataTypes.STRING },
    Tip_Programa: { type: DataTypes.CHAR },
    Id_Area: {
      type: DataTypes.INTEGER,
      references: AreaModel,
      key: "Id_Area",
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

export default ProgramaModel;
