require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');

class Server {
    constructor() {
        this.app = express();
        this.serverMidlewares();
        this.upServer();
    }

    serverMidlewares(){
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
    }

    upServer(){
        this.app.get('/users',(req, res)=>{
            res.json({message : 'get usuer'});
        });

        this.app.get(`/user/:id`,(req, res)=>{
            res.json({message : 'get usuer'});
        });

        this.app.post('/user',(req, res)=>{
            let body = req.body;

            if(req.body.email === undefined){
                res.status(400).json(
                    {
                        ok : false,
                        message: 'Faltan campos necesarios'
                    }
                )
            }else{
                res.json(
                    {
                        user: body
                    }
                );
            }
           
        });

        this.app.put(`/user/:id`,(req, res)=>{
            let id = req.params.id;
            res.json(
                {
                    id
                }
            );
        });

        this.app.delete(`/user/:id`,(req, res)=>{
            res.json({message : 'delete usuer'});
        });

        this.app.listen(process.env.PORT, ()=>{
            console.log('El servidor esta escuchando en el puerto:', process.env.PORT);
        });
    }

    getUsers(){
        
    }

    getUser(id){
        
    }

    addUser(){
        
    }

    updateUser(id){
        
    }

    disableUser(id){
        
    }
}
const server = new Server();
module.exports = server;