const productoService = require('../services/producto.service');
const createProducto = async (req, res) => {
    const { nombre, descripcion, precio, cantidad } = req.body;
    const newProducto = {
        nombre,
        descripcion,
        precio,
        cantidad
    };
    try {
        const response = await productoService.createProducto(newProducto);
        
        if (response?.errors) {
            return res.status(400).json({
                status: 'BAD REQUEST',
                data: "Ups, vuelve a intentarlo",
            });
        }
        
        // Si no hay errores, envía la respuesta con éxito
        return res.status(201).json({
            status: "CREATED",
            data: "Producto created",  // Cambié "Factura created" por "Producto created"
        });
        
        // Este console.log nunca se ejecutaría después del return, puedes moverlo antes si es necesario
        console.log("Message sent: %s", info.messageId);
        
    } catch (error) {
        return res.status(500).json({
            status: 'Error en el servidor',
            data: error
        });
    }
};
module.exports = {
    createProducto
}