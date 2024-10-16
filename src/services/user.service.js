const User = require('../database/models/user.model');
const bcrypt = require('bcrypt');
const isValidEmail = async (correo_electronico) => {
    const isEmailExists = await User.findOne({
        where: {
            correo_electronico,
        }
    });
    return isEmailExists;
}
const createUser = async (newUser) => {
    const { nombre, apellidos, telefono, correo_electronico, clave } = newUser 
    const passwordHash = await bcrypt.hash(clave, 10);
    const user = new User({
        nombre,
        apellidos,
        telefono,
        correo_electronico,
        clave: passwordHash,
    });
    try {
        await user.save();
        return true;
    } catch (error) {
        return error;
    }
}

module.exports = {
    isValidEmail,
    createUser
}