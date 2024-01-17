const { query, response } = require('express');
const pool = require('../database/conexion');

const getHeroes = (req=query,res=response) => {
    
    let dataPorPagina =  req.query.resultadosPorPagina || 6;
    let paginaActual  = req.query.paginaActual || 1;
  
    let sql = `SELECT * FROM HEROES 
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
    let sql = `SELECT * FROM HEROES 
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
    

    let sql = `SELECT name FROM HEROES `;
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
    let sql = 'select * from HEROES where id= ?';

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




module.exports = {
    getHeroes,
    getHeroe,
    getHeroeFiltro,
    listaNombresHeores
}