import db from "../database/db.js";
import { DataTypes } from "sequelize";

const FileCsvModel = db.define(
  "archivo_csv",
  {
    Id_Archivo_Csv: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nom_Archivo_Csv: { type: DataTypes.STRING },
    Archivo_Csv: { type: DataTypes.STRING },
    Fec_Creacion: { type: DataTypes.DATE },
    Estado: {
      type: DataTypes.ENUM("Activo", "Inactivo"),
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
export default FileCsvModel;
