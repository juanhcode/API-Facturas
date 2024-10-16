const { DataTypes } = require('sequelize');
const db = require('../connection');
const Producto = db.define('producto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantidad:{
        type: DataTypes.INTEGER,
        allowNull: false
    }},
    {
    timestamps: false,
    freezeTableName: true,
    tableName: 'producto'
    }
);

Producto.prototype.toJSON = function(){
    let values = Object.assign({}, this.get());
    return values;
}

module.exports = Producto;