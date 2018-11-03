require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

class Server {
    constructor() {
        this.app = express();
        this.serverMidlewares();
        this.upServer();
    }

    serverMidlewares(){
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
        this.app.use(require('./controllers/usuario.controller'))
    }

    upServer(){
        mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, res)=>{
            if (err) throw err;

            console.log('Database Online!!');
        });

        this.app.listen(process.env.PORT, ()=>{
            console.log('El servidor esta escuchando en el puerto:', process.env.PORT);
        });
    }
}
const server = new Server();
module.exports = server;