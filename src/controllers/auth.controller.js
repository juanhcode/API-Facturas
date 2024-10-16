const { tokenSign } = require('../helpers/generateToken.js');
const userService = require('../services/user.service');
const bcrypt = require('bcrypt');
const login = async (req, res) => {
    try {
        const { correo_electronico, clave } = req.body;
        const isEmailExists = await userService.isValidEmail(correo_electronico);
        const isPasswordValid = bcrypt.compareSync(clave, isEmailExists.clave);
        if (!isEmailExists){
            return res.status(404).json({
                msg: 'No existe usuario con el correo: ' + correo_electronico
            });
        }
        if (!isPasswordValid) {
            return res.status(401).json({
                msg: 'Contraseña incorrecta'
            });
        }
        const user = {
            id: isEmailExists.id,
            correo_electronico: isEmailExists.correo_electronico,
        }
        const token = await tokenSign(user);
        res.status(200).json({
            token
        }) 
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor',
            error
        })
    }
}


const register = (req, res) => {
    const { nombre, apellidos, telefono, correo_electronico, clave } = req.body;
    console.log(req.body);
    const user = {
        nombre,
        apellidos,
        telefono,
        correo_electronico,
        clave
    }
    const response = userService.createUser(user);
    if (response) {
        res.status(201).send({
            message: "Usuario Registrado",
        })
    } else {
        res.send(response);
    }
}

module.exports = {
    login,
    register
}