import db from "../database/db.js"
import { DataTypes } from "sequelize"

const cityModel = db.define('Ciudades',{
    Id_Ciudad :{type:DataTypes.STRING(10),primaryKey:true,allowNull:false},
    Nom_Ciudad:{type:DataTypes.STRING(50)}
}) 

export default cityModel;