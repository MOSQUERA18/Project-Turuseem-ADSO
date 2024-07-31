import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ProgramaModel = db.define(
  "programasformacion",
  {
    Id_ProgramaFormacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    Nom_ProgramaFormacion: { type: DataTypes.STRING },
    Tip_ProgramaFormacion: { type: DataTypes.CHAR },
    Id_Area: {
      type: DataTypes.INTEGER,
      references: {
        model: AreaModel.AreaModel,
        key: 'Id_Area'
      }
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
