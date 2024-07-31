import db from "../database/db"
import { DataTypes } from "sequelize"
import FichasModel from "./fichasModel.js"
import UnitModel from "./unitModel.js"
import FuncionarioModel from "./funcionarioModel.js"

const TurnoEspecialModel = db.define("turnosespeciales",{
    Id_TurnoEspecial :{type : DataTypes.INTEGER,primaryKey:true,autoIncrement:true,allowNull:false},
    Fec_TurnoEspecial : {type:DataTypes.DATE},
    Hor_Inicio : {type:DataTypes.TIME},
    Hor_Fin : {type:DataTypes.TIME},
    Obs_TurnoEspecial: {type:DataTypes.STRING},
    Id_Ficha: {
        type:DataTypes.STRING(11),
        references:{
        model: FichasModel,
        key: 'Id_Ficha'
        }
    },
    Img_TurnoEspecial : {type:DataTypes.STRING},
    Id_Funcionario : {type:DataTypes.STRING(11),
        references:{
        model: FuncionarioModel,
        key: 'Id_Funcionario'
        }
    },
    Id_Unidad : {type:DataTypes.INTEGER,
        references:{
        model: UnitModel,
        key: 'Id_Unidad'
        }
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
},{
    freezeTableName: true
});
export default TurnoEspecialModel;