const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

class LoginController{

    constructor(){
        this.app = express();

        this.app.post('/login', (req, res)=>{

            let body = req.body;

            UserModel.findOne({email: body.email}, (err, userDB)=>{
                if(err) {
                    return res.status(500).json(
                       {
                            ok: false,
                            err 
                       } 
                    );
                }

                if(!userDB){
                    return res.status(400).json(
                        {
                             ok: false,
                             err:{
                                 message: 'Usuario o contraseña incorrectos.'
                             }
                        } 
                     );
                }

                if(!bcrypt.compareSync(body.password, userDB.password)){
                    return res.status(400).json(
                        {
                             ok: false,
                             err:{
                                 message: 'Usuario o contraseña incorrectos.'
                             }
                        } 
                     );
                }

                let token = jwt.sign(
                    {
                        user:userDB
                    },process.env.SEED,
                    {
                        expiresIn: process.env.TOKEN_LIFE
                    }
                );

                res.json(
                    {
                        ok: true,
                        user: userDB,
                        token
                    }
                ); 
            });
        });
    }
}

const loginController = new LoginController();

module.exports = loginController.app;