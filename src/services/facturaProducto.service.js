const FacturaProducto = require('../database/models/facturaProducto.model');
const addProductoToFactura = async (id_producto,id_factura) => {
    const producto = new FacturaProducto({
        id_producto,
        id_factura
    });
    try {
        await producto.save();
        console.log(`Producto ${id_producto} agregado a la factura ${id_factura}`);
        return true;
    } catch (error) {
        console.error('Error al agregar producto a factura:', error);
        return error;
    }
}


module.exports = {
    addProductoToFactura
}
