const express = require('express');
const {corsMiddleware} = require('../middlewares/cors');
require('dotenv').config();

class Servidor{
    
    constructor(){
        this._app = express();
        this._port = process.env.PORT;
        this._dotapath = '/api/dota/';

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this._app.use(express.static('public'));
        this._app.use(corsMiddleware());
        this._app.use(express.json());
    }

    routes(){
        this._app.use(this._dotapath,require('../routes/heroe'));
    }

    listen(){
        this._app.listen(this._port,()=>{
            console.log(`escuchando en el puerto ${this._port}`);
        })  
    }
}

module.exports = {
    Servidor
}

