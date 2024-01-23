const { query, response } = require('express');
const {handleError,handleSuccess} = require('../helpers/reponseHandle');
const pool = require('../database/conexion');

const getHeroes = (req=query,res=response) => {
    
    let dataPorPagina =  req.query.quantity || 6;
    let sql = `SELECT * FROM DATA_HEROES
                LIMIT ${dataPorPagina}`;
                
    try {
        pool.query(sql,(err,rows,fields)=>{
            try {
                if(err){
                    throw err
                }else{

                    new_rows = rows.map(e=>{

                        let base_attack;
                        switch(e.primary_attr){
                            case 'str': base_attack = e.base_str;break
                            case 'agi': base_attack = e.base_agi;break
                            case 'int': base_attack = e.base_int;break
                            case 'all': base_attack = (e.base_str+e.base_agi+e.base_int)*0.7;break;
            
                        }

                        return {
                            ...e,
                            armor : parseFloat(((e.base_agi*1/6) + e.base_armor).toFixed(1)),
                            health : e.base_str*22 + e.base_health,
                            mana : e.base_int*12 + e.base_mana,
                            attack_min : Math.round(base_attack + e.base_attack_min),
                            attack_max : Math.round(base_attack + e.base_attack_max) 
                        }
                    })

                    
                    handleSuccess(res,new_rows);
                }
            } catch (err) {
                handleError(res,400,'Bad request',err);
            }
        })
    } catch (err) {
        handleError(res,500,'Internal Server Error',err);
    }

}

const getHeroeFiltro = (req=query,res=response) => {
    

    let nombreHeroe = req.query.heroe;
    let sql = `SELECT * FROM DATA_HEROES 
                WHERE localized_name = "${nombreHeroe}"`;

    try {
        pool.query(sql,(err,rows,fields)=>{
            try {
                if(err){
                    throw err
                }else{

                    new_rows = rows.map(e=>{

                        let base_attack;
                        switch(e.primary_attr){
                            case 'str': base_attack = e.base_str;break
                            case 'agi': base_attack = e.base_agi;break
                            case 'int': base_attack = e.base_int;break
                            case 'all': base_attack = (e.base_str+e.base_agi+e.base_int)*0.7;break;
            
                        }

                        return {
                            ...e,
                            armor : parseFloat(((e.base_agi*1/6) + e.base_armor).toFixed(1)),
                            health : e.base_str*22 + e.base_health,
                            mana : e.base_int*12 + e.base_mana,
                            attack_min : Math.round(base_attack + e.base_attack_min),
                            attack_max : Math.round(base_attack + e.base_attack_max) 
                        }
                    })
                    
                    handleSuccess(res,new_rows[0]);
                
                }
            } catch (err) {
                handleError(res,400,'Bad request',err);
            }
        })
    } catch (err) {
        handleError(res,500,'Internal Server Error',err);
    }

}

const listaNombresHeores = (req=query,res=response) => {
    

    let sql = `SELECT localized_name FROM HEROES `;
    try {
        pool.query(sql,(err,rows,fields)=>{
            try {
                if(err){
                    throw err
                }else{
                    handleSuccess(res,rows);
                }
            } catch (err) {
                handleError(res,400,'Bad request',err);
            }
        })
    } catch (err) {
        handleError(res,500,'Internal Server Error',err);
    }

}

const getHeroe = (req=query,res=response) => {
    const {id} = req.params;
    let sql = 'select * FROM DATA_HEROES where id= ?';

    try {
        pool.query(sql,[id],(err,rows,fields)=>{
            try {
                if(err){
                    throw err
                }else{

                    handleSuccess(res,rows);
                }
            } catch (err) {
                handleError(res,400,'Bad request',err);
            }
        })
    } catch (err) {
        handleError(res,500,'Internal Server Error',err);
    }

}


module.exports = {
    getHeroes,
    getHeroe,
    getHeroeFiltro,
    listaNombresHeores
}