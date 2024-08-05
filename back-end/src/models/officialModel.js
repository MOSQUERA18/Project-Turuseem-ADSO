import db from "../database/db.js";
import { DataTypes } from "sequelize";

const OfficialModel = db.define(
  "funcionarios",
  {
    Id_Funcionario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Nom_Funcionario: {
      type: DataTypes.STRING,
    },
    Ape_Funcionario: {
      type: DataTypes.STRING,
    },
    Genero: {
      type: DataTypes.STRING,
    },
    Tel_Funcionario: {
      type: DataTypes.STRING,
    },
    Estado: {
      type: DataTypes.ENUM("Activo", "Inactivo"),
    },
    Cargo: {
      type: DataTypes.ENUM("Planta", "Contratista"),
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);

export default OfficialModel;
