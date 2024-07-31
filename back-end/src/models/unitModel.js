import db from "../database/db.js";
import { DataTypes } from "sequelize";
import AreaModel from "./areaModel.js";

const UnitModel = db.define("unidades", {
    Id_Unidad: { type: DataTypes.INTEGER, primaryKey: true },
    Nom_Unidad: { type: DataTypes.STRING },
    Id_Area: {
        type: DataTypes.INTEGER,
        references: {
            model: AreaModel,
            key: 'Id_Area'
        }
    }
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
}, {
    freezeTableName: true
});

export default UnitModel;