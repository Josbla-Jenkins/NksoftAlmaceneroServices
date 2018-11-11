const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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

        //google configs

        async function verify( token ) {
            let ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            let payload = ticket.getPayload();

            return {
                userName : payload.name,
                email : payload.email,
                img : payload.picture,
                google : true
            }
          }

        this.app.post('/google', async(req, res)=>{

            let token = req.query.idToken;

            let googleUser = await verify(token)
                .catch(e =>{
                   return res.status(403).json(
                        {
                            ok : false,
                            err : {
                                message: e
                            }
                        }
                    );
                });

            UserModel.findOne({ email: googleUser.email }, (err, userDB)=>{
                if(err) {
                    return res.status(500).json(
                       {
                            ok: false,
                            err 
                       } 
                    );
                }

                if(userDB){

                    if(userDB.google === false){
                        return res.status(400).json(
                            {
                                 ok: false,
                                 err : {
                                     message: 'Debe hacer ingreso a la plataforma mediante su usuario y password'
                                 }
                            } 
                         );
                    }else{
                        let token = jwt.sign(
                            {
                                user:userDB
                            },process.env.SEED,
                            {
                                expiresIn: process.env.TOKEN_LIFE
                            }
                        );

                        return res.json(
                            {
                                ok: true,
                                user: userDB,
                                token
                            }
                        )
                    }
                }else{
                    //si el usuario no existe
                    let user = new UserModel();

                    user.userName = googleUser.userName;
                    user.email = googleUser.email;
                    user.img = googleUser.img;
                    user.google = googleUser.google;
                    user.password = 'CAD5D9756CB8C6397A97A338BB71C593D9579E14C17D6613F3A3D3808BA34858';

                    user.save((err, userDB)=>{
                        if(err) {
                            return res.status(400).json(
                               {
                                    ok: false,
                                    err 
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
                }
            });
        });
    }
}

const loginController = new LoginController();

module.exports = loginController.app;