const express = require('express');

class IndexController{

    constructor(){
        this.app = express();

        this.app.use(require('./usuario.controller'));
        this.app.use(require('./login.controller'));
    }
}
const indexController = new IndexController();

module.exports = indexController.app;