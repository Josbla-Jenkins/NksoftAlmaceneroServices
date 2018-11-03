const express = require('express');
const UserModel = require('./../models/user.model');
const bcrypt = require('bcrypt');
const _ = require('underscore');

class UsuarioCOntroller{

    constructor(){
        this.app = express();

        this.app.get('/users',(req, res)=>{
            let start = req.query.start || 0;
            start = Number(start);
            let paginator = req.query.paginator || 5;
            paginator = Number(paginator);
            UserModel.find({status: true}, 'userName email img role status google')
            .skip(start)
            .limit(paginator)
            .exec((err, usersDB)=>{
                if(err) {
                    return res.status(400).json(
                       {
                            ok: false,
                            err 
                       } 
                    );
                }
                UserModel.count({status: true}, (err, count)=>{
                    res.json(
                        {
                            ok: true,
                            users: usersDB,
                            totalUsers: count
                        }
                    ); 
                });
            });
        });

        this.app.get(`/user/:id`,(req, res)=>{
            res.json({message : 'get usuer'});
        });

        this.app.post('/user',(req, res)=>{
            let body = req.body;
            let user = new UserModel(
                {
                    userName: body.userName,
                    email: body.email,
                    password: bcrypt.hashSync(body.password, 10),
                    role: body.role
                }
            );
            user.save((err, userDB)=>{
                if(err) {
                    return res.status(400).json(
                       {
                            ok: false,
                            err 
                       } 
                    );
                }

                res.json(
                    {
                        ok: true,
                        user: userDB
                    }
                );
            }); 
        });

        this.app.put(`/user/:id`,(req, res)=>{
            let id = req.params.id;
            let body = _.pick(req.body, ['userName','email','img','role','status']);

            UserModel.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, userDB)=>{
                if(err) {
                    return res.status(400).json(
                       {
                            ok: false,
                            err 
                       } 
                    );
                }
                res.json(
                    {
                        ok: true,
                        user: userDB
                    }
                );
            });
        });

        this.app.delete(`/user/:id`,(req, res)=>{
            let id = req.params.id;
            let changeStatus = {
                status: false
            };

            UserModel.findByIdAndUpdate(id, changeStatus, {new: true}, (err, deletedUser)=>{
                if(err) {
                    return res.status(400).json(
                       {
                            ok: false,
                            err 
                       } 
                    );
                }

                res.json(
                    {
                        ok: true,
                        user: deletedUser
                    }
                );

            }); 
        });

    }
}
const usuarioController = new UsuarioCOntroller();
module.exports = usuarioController.app;