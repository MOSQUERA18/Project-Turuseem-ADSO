import db from "../database/db.js";
import { DataTypes } from "sequelize";

const AbsenceModel = db.define(
  "inasistencias",
  {
    Id_Inasistencia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Fec_Inasistencia: {
      type: DataTypes.DATE,  // Cambiado a DATE en lugar de TIME
      allowNull: false,
    },
    Mot_Inasistencia: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Turno_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,  // Se permite null ya que puede ser un aprendiz o turno rutinario
    },
    Tipo_Inasistencia: {
      type: DataTypes.ENUM('turno_rutinario', 'aprendiz'),
      allowNull: false,  // No puede ser nulo, siempre debe tener un tipo
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
