import db from "../database/db.js";
import { DataTypes } from "sequelize";

const OfficialModel = db.define(
  "funcionarios",
  {
    Id_Funcionario: { type: DataTypes.INTEGER, primaryKey: true },
    Nom_Funcionario: { type: DataTypes.STRING },
    Ape_Funcionario: { type: DataTypes.STRING },
    Genero: { type: DataTypes.CHAR },
    Tel_Funcionario: { type: DataTypes.STRING },
    Estado: { type: DataTypes.CHAR },
    Cargo: { type: DataTypes.CHAR },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
export default OfficialModel;
