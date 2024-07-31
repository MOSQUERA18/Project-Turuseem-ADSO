import db from "../database/db.js";
import { DataTypes } from "sequelize";
import FichasModel from "./fichasModel.js";

const ApprenticeModel = db.define(
  "aprendices",
  {
    Id_Aprendiz: { type: DataTypes.INTEGER, primaryKey: true },
    Nom_Aprendiz: { type: DataTypes.STRING },
    Ape_Aprendiz: { type: DataTypes.STRING },
    Id_Ficha: {
      type: DataTypes.STRING,
      references: {
        model: FichasModel,
        key: "Id_Ficha",
      },
    },
    Fec_Nacimiento: { type: DataTypes.DATE },
    Gen_Aprendiz: { type: DataTypes.CHAR },
    Cor_Aprendiz: { type: DataTypes.STRING },
    Tel_Aprendiz: { type: DataTypes.STRING },
    Tot_Memorandos: { type: DataTypes.INTEGER },
    Tot_Inasistencias: { type: DataTypes.INTEGER },
    Patrocinio: { type: DataTypes.CHAR },
    Estado: { type: DataTypes.CHAR },
    CentroConvivencia: { type: DataTypes.CHAR },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
export default ApprenticeModel;
