const {Router} = require('express');
const router = Router();
const facturaController = require('../../controllers/factura.controller');

router.post('', facturaController.createFactura);
// router.delete('/:id', facturaController.deleteFactura);
// router.get('/:id', facturaController.getFacturaById);
// router.get('/all/:id', facturaController.getAllFacturas);
// router.put('/:id', facturaController.updateFactura);
module.exports = router;