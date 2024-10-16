const Factura = require('../database/models/factura.model');
const createFactura = async (newFactura) => {
    const { fecha_de_pedido, fecha_de_vencimiento,cantidad, impuestos, importe, total, id_usuario } = newFactura;
    const factura = new Factura({
        fecha_de_pedido,
        fecha_de_vencimiento,
        cantidad,
        impuestos,
        importe,
        total,
        id_usuario
    });
    try {
        await factura.save();
        return factura;
    } catch (error) {
        return error;
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
    const {dataValues} = factura;
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
    createFactura,
    facturaExistsById,
    deleteFactura,
    getTaskById,
    getAllFacturas,
    updateFactura
}
