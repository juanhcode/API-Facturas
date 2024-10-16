const Producto = require('../database/models/producto.model');
const createProducto = async (newProducto) => {
    const { nombre, descripcion, precio, cantidad } = newProducto;
    const producto = new Producto({
        nombre,
        descripcion,
        precio,
        cantidad
    });
    try {
        await producto.save();
        return true;
    } catch (error) {
        return error;
    }
}

const getProductoById = async (id) => {
    try {
        const producto = await Producto.findByPk(id); // Busca por clave primaria
        if (!producto) {
            throw new Error(`Producto con ID ${id} no encontrado`);
        }
        return producto;
    } catch (error) {
        console.error('Error al obtener producto:', error);
        throw new Error('Error al obtener producto');
    }
}

const facturaExistsById = async (id) => {
    const factura = await Factura.findByPk(id);
    return factura;
}

const deleteFactura = async (id) => {
    const facturaDeleted = await Factura.destroy({
        where: {
            id
        }
    });
    return facturaDeleted;
}

const getTaskById = async (id) => {
    const factura = await Factura.findByPk(id);
    const { dataValues } = factura;
    if (factura) {
        return dataValues;
    }
    return factura;
}

const getAllFacturas = async (Id) => {
    const facturas = await Factura.findAll({
        where: {
            id_usuario: Id
        }
    });
    return facturas;
}

const updateFactura = async (id, newFactura) => {
    const { fecha_de_pedido, fecha_de_vencimiento, impuestos, importe, total, id_usuario } = newFactura;
    const factura = await Factura.update({
        fecha_de_pedido,
        fecha_de_vencimiento,
        impuestos,
        importe,
        total,
        id_usuario
    }, {
        where: {
            id
        }
    });
    return factura;
}

module.exports = {
    createProducto,
    facturaExistsById,
    getProductoById,
    deleteFactura,
    getTaskById,
    getAllFacturas,
    updateFactura
}
