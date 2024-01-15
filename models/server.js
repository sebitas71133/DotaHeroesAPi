const express = require('express');
var cors = require('cors')
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
        this._app.use(cors());
        this._app.use(express.json());
    }

    routes(){
        this._app.use(this._dotapath,require('../routes/heroe'));
    }

    listen(){
        this._app.listen(this._port,'0.0.0.0',()=>{
            console.log(`escuchando en el puerto ${this._port}`);
        })  
    }
}

module.exports = {
    Servidor
}

