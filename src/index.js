const express = require('express');
const app = express();
const morgan = require('morgan');
const db = require ('./database/connection');
const auth = require('./routes/v1/auth.routes');
const factura = require('./routes/v1/factura.routes');
const producto = require('./routes/v1/producto.routes');
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(morgan('dev'));
app.use(express.json());
app.use('/v1/auth', auth);
app.use('/v1/factura', factura);
app.use('/v1/producto', producto);

let server = app.listen(3000, async () => {
    await db.authenticate();
    console.log('Database online');
    console.log(`Application server running on ${3000}`);
});