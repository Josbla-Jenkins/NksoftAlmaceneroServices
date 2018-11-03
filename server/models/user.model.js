const rolesValidos = require('./../config/config');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

class UserModel{

    constructor(){

        this.userSchema = new mongoose.Schema(
            {
                userName: {
                    type: String,
                    required: [true, 'El nombre es requerido']
                },
                email: {
                    type: String,
                    unique: true,
                    required: [true, 'El correo es requerido'],
                },
                password: {
                    type: String,
                    required: [true, 'La contraseña es requerida']
                },
                img: {
                    type: String,
                    required: false
                },
                role: {
                    type: String,
                    default: 'USER_ROLE',
                    enum: rolesValidos.rolesValidos
                },
                status: {
                    type: Boolean,
                    default: true
                },
                google: {
                    type: Boolean,
                    default: false
                }
            }
        );

        this.userSchema.plugin(uniqueValidator, {message: '{PATH} debe ser unico'});
    }
}

const userModel = new UserModel();

module.exports = mongoose.model('UserModel', userModel.userSchema);
