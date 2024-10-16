const { DataTypes } = require('sequelize');
const db = require('../connection');

const User = db.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: false
    }},
    {
    timestamps: false,
    freezeTableName: true,
    tableName: 'usuario'
});

User.prototype.toJSON = function(){
    let values = Object.assign({}, this.get());
    delete values.password;
    return values;
}


module.exports = User;