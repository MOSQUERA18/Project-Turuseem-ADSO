import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ChargesModel = db.define('cargos',{
    Id_Cargo: { type: DataTypes.INTEGER, primaryKey: true },
    Nom_Cargo: { type: DataTypes.STRING}
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

export default ChargesModel