import db from "../database/db.js";
import { DataTypes } from "sequelize";
import AreaModel from "./areaModel.js";

const ProgramaModel = db.define('programasformacion', {
    Id_ProgramaFormacion: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement:true, allowNull: false },
    Nom_ProgramaFormacion: { type: DataTypes.STRING },
    Tip_ProgramaFormacion: { type: DataTypes.CHAR },
    Id_Area: { type: DataTypes.INTEGER,
        references: {
            model: AreaModel,
            key: 'Id_Area'
        }
     }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
},{
    freezeTableName: true
}
)

export default ProgramaModel;