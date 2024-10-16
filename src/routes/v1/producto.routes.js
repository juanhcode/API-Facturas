const {Router} = require('express');
const router = Router();
const productoController = require('../../controllers/producto.controller');

router.post('', productoController.createProducto);
module.exports = router;