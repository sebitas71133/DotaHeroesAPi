const { query, response } = require('express');
const path = require('path');
const pool = require('../database/conexion');
const fs = require('fs');
const { log } = require('console');

const getHeroes = (req=query,res=response) => {
    
    let dataPorPagina =  req.query.resultadosPorPagina;
    let paginaActual  = req.query.paginaActual;
  
    let sql = `SELECT * FROM heroes 
                ORDER BY name
                LIMIT ${dataPorPagina} 
                OFFSET ${(paginaActual-1)*dataPorPagina}`;

    try {
        pool.query(sql,(error,rows,fields)=>{
            try {
                if(error){
                    throw error
                }else{
                    res.status(200).json({
                        msg : 'ok',
                        data : rows
                    });
                }
            } catch (error) {
                console.error('Error response: ',error);
            }
        })
    } catch (error) {
        console.error('Error BD: ',error);
    }

}

const getHeroeFiltro = (req=query,res=response) => {
    

    let nombreHeroe = req.query.heroe;
    let sql = `SELECT * FROM heroes 
                WHERE name = "${nombreHeroe}"`;

    try {
        pool.query(sql,(error,rows,fields)=>{
            try {
                if(error){
                    throw error
                }else{
                    res.status(200).json({
                        msg : 'ok',
                        data : rows
                    });
                }
            } catch (error) {
                console.error('Error response: ',error);
            }
        })
    } catch (error) {
        console.error('Error BD: ',error);
    }

}

const listaNombresHeores = (req=query,res=response) => {
    

    let sql = `SELECT name FROM heroes `;
    try {
        pool.query(sql,(error,rows,fields)=>{
            try {
                if(error){
                    throw error
                }else{
                    res.status(200).json({
                        msg : 'ok',
                        data : rows
                    });
                }
            } catch (error) {
                console.error('Error response: ',error);
            }
        })
    } catch (error) {
        console.error('Error BD: ',error);
    }

}

const getHeroe = (req=query,res=response) => {
    const {id} = req.params;
    let sql = 'select * from heroes where idheroes = ?';

    try {
        pool.query(sql,[id],(error,rows,fields)=>{
            try {
                if(error){
                    res.status(400).json(rows);
                    throw error
                }else{
                    res.status(200).json({
                        msg : 'ok',
                        data : rows
                    });
                }
            } catch (error) {
                console.error('Error response: ',error);
            }
        })
    } catch (error) {
        console.error('Error BD: ',error);
    }

}

const getImageHeroe = (req=query,res=response)=> {
        const {id} = req.params;
        const pathImagen = path.join(__dirname,`../public/images/${id}.jpg`);

        fs.readFile(pathImagen,(err,data)=>{
            if(err){
                console.error('Error al leer la imagen:', err);
                
                 res.status(404).send('Imagen no encontrada');
            }else{
                res.status(200).contentType('image/jpeg').end(data);
            }
        });
}



module.exports = {
    getHeroes,
    getHeroe,
    getImageHeroe,
    getHeroeFiltro,
    listaNombresHeores
}