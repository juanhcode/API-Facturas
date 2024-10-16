const { DataTypes } = require('sequelize');
const db = require('../connection');
const Producto = require('./producto.model');
const Factura = require('./factura.model');
const FacturaProducto = db.define('productos_factura', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_producto: {
        type: DataTypes.INTEGER,
        references: {
            model: Producto,
            key: 'id'
        }
    },
    id_factura: {
        type: DataTypes.INTEGER,
        references: {
            model: Factura,
            key: 'id'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'productos_factura'
});
FacturaProducto.belongsTo(Producto, { foreignKey: 'id_producto' });
FacturaProducto.belongsTo(Factura, { foreignKey: 'id_factura' });


FacturaProducto.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    return values;
}

module.exports = FacturaProducto;