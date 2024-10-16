const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenSign = async (usuario)=>{
    return jwt.sign(
        {
            id:usuario.id,
            correo_electronico:usuario.correo_electronico
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"6h"
        }
    );
}

module.exports = {
    tokenSign
}