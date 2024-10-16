const { DataTypes } = require('sequelize');
const db = require('../connection');
const User = require('./user.model');
const Factura = db.define('factura', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    fecha_de_pedido: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_de_vencimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    cantidad:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    impuestos:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    importe:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key: 'id'
        }
    }},
    {
    timestamps: false,
    freezeTableName: true,
    tableName: 'factura'
    }
);

Factura.belongsTo(User,{foreignKey:'id_usuario'});


Factura.prototype.toJSON = function(){
    let values = Object.assign({}, this.get());
    return values;
}

module.exports = Factura;