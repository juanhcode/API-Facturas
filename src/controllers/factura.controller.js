const facturaService = require('../services/factura.service');
const productoService = require('../services/producto.service');
const facturaProductoService = require('../services/facturaProducto.service');
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "juanhoyos1347@gmail.com",
        pass: "mqcxkfdtcyhcuryn",
    },
});
const createFactura = async (req, res) => {
    const { fecha_de_pedido, fecha_de_vencimiento, productos, impuestos, id_usuario } = req.body;

    try {
        let totalFactura = 0;
        let cantidad_total = 0;

        // Mapear los productos y calcular el total y cantidad
        const productosDetalle = await Promise.all(productos.map(async (producto) => {
            const { id, cantidad } = producto;

            const productoDB = await productoService.getProductoById(id); // Asegurar que sea asincrónico
            if (!productoDB) {
                return res.status(404).json({
                    status: 'NOT FOUND',
                    data: `Producto con ID ${id} no encontrado`,
                });
            }

            const importeProducto = productoDB.precio * cantidad;
            totalFactura += importeProducto;
            cantidad_total += cantidad;

            return {
                id: productoDB.id,
                cantidad,
                importe: importeProducto
            };
        }));

        // Crear la nueva factura
        const newFactura = {
            fecha_de_pedido,
            fecha_de_vencimiento,
            cantidad: cantidad_total,  // Actualizar con el total calculado
            impuestos,
            importe: totalFactura + impuestos,  // Suponiendo que el importe incluye el total más impuestos
            total: totalFactura + impuestos,
            id_usuario
        };

        const facturaCreada = await facturaService.createFactura(newFactura); // Crear la factura en el sistema
        if (!facturaCreada) {
            return res.status(400).json({
                status: 'BAD REQUEST',
                data: "Error al crear la factura. Vuelve a intentarlo.",
            });
        }

        // Asignar los productos a la factura recién creada
        for (const producto of productosDetalle) {
            await facturaProductoService.addProductoToFactura(producto.id, facturaCreada.id);
        }

        // Enviar correo de confirmación
        const info = await transporter.sendMail({
            from: 'juanhoyos1347@gmail.com', // dirección del remitente
            to: "juan.manuel.hoyos@correounivalle.edu.co", // lista de destinatarios
            subject: "Confirmación de tu pedido ✔", // Asunto
            text: "Gracias por tu pedido!", // cuerpo de texto plano
            html: `
                <body class="body" style="margin: 0 !important; padding: 0 !important; background-color: #ffffff;" bgcolor="#ffffff">
                <div role="article" aria-roledescription="email" aria-label="Email from Your Company" xml:lang="en" lang="en">
                    <div class="litmus-builder-preview-text" style="display:none;">
                        &#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;
                    </div>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                        <tr>
                            <td align="center">
                                <table class="w100p" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;">
                                    <tr>
                                        <td align="center" valign="top" style="font-size:0; padding: 35px; background-color: #004265;">
                                            <table class="w100p" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;">
                                                <tr>
                                                    <td align="left" valign="middle" class="mobile-center"></td>
                                                    <td class="mobile-hide" align="right" valign="middle">
                                                        <table cellspacing="0" cellpadding="0" border="0" role="presentation">
                                                            <tr>
                                                                <td valign="middle">
                                                                    <p style="font-size: 18px; line-height: 20px; font-weight: 400; margin: 0; color: #ffffff;">
                                                                        <a style="color: #ffffff; text-decoration: none;">Shop</a> &nbsp;
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="padding: 35px 35px 20px 35px;">
                                            <table class="w100p" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;">
                                                <tr>
                                                    <td align="center" style="padding-top: 25px;">
                                                        <h2 style="font-size: 30px; font-weight: normal; line-height: 36px; color: #028383; margin: 0;">
                                                            ¡Gracias por tu pedido!
                                                        </h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" style="padding: 30px 0;">
                                                        <p style="color: #777777;">
                                                            Tu pedido ha sido recibido y será procesado en breve.
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <table cellspacing="0" cellpadding="0" border="0" width="100%" role="presentation">
                                                            <tr>
                                                                <td width="75%" align="left" style="background-color: #d7f1ff; padding: 10px;">
                                                                    <p style="font-weight: 800;">Número de Confirmación de Pedido.</p>
                                                                </td>
                                                                <td width="25%" align="left" style="background-color: #d7f1ff; padding: 10px;">
                                                                    <p class="blueLinks" style="font-weight: 800;">#${facturaCreada.id}</p>
                                                                </td>
                                                            </tr>
                                                            ${productosDetalle.map(producto => `
                                                                <tr>
                                                                    <td width="75%" align="left" style="padding: 15px 10px 10px;">
                                                                        <p>Producto: ${producto.id} (Cantidad: ${producto.cantidad})</p>
                                                                    </td>
                                                                    <td width="25%" align="left" style="padding: 15px 10px 10px;">
                                                                        <p>$${producto.importe.toFixed(2)}</p>
                                                                    </td>
                                                                </tr>
                                                            `).join('')}
                                                            <tr>
                                                                <td width="75%" align="left" style="padding: 10px;">
                                                                    <p>Impuestos</p>
                                                                </td>
                                                                <td width="25%" align="left" style="padding: 10px;">
                                                                    <p>$${impuestos.toFixed(2)}</p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" style="padding-top: 20px;">
                                                        <table cellspacing="0" cellpadding="0" border="0" width="100%" role="presentation">
                                                            <tr>
                                                                <td width="75%" align="left" style="padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                                                    <p style="font-weight: 800;">TOTAL</p>
                                                                </td>
                                                                <td width="25%" align="left" style="padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                                                    <p style="font-weight: 800;">$${newFactura.total.toFixed(2)}</p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="padding: 10px 0;">
                                            <p style="font-size: 14px; line-height: 20px; color: #777777;">
                                                Si tienes preguntas, contáctanos en
                                                <a href="mailto:support@example.com" style="color: #028383;">support@example.com</a>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="padding: 20px 0;">
                                            <p style="font-size: 14px; line-height: 20px; color: #777777;">
                                                © 2024 Your Company. Todos los derechos reservados.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
                </body>
            `, // Cuerpo HTML
        });
        return res.status(200).json({
            status: 'OK',
            data: "Factura creada y correo enviado con éxito.",
        });
    } catch (error) {
        return res.status(500).json({
            status: 'INTERNAL SERVER ERROR',
            data: "Ocurrió un error al procesar tu solicitud.",
        });
    }
};



module.exports = {
    createFactura
}

