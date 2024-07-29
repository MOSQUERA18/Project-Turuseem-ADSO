import db from '../database/db.js'
import { DataTypes } from 'sequelize'

const MemorandumModel = db.define('memorandos', {
    Id_Memorando: {type: DataTypes.NUMBER, primaryKey: true},
    Fec_Memorando: {type: DataTypes.DATE},
    Mot_Memorando: {type: DataTypes.TEXT},
    Id_Inasistencia: {type: DataTypes.NUMBER}
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
},{
    freezeTableName: true
})

export default MemorandumModel