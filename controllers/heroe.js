const { query, response } = require('express');
const pool = require('../database/conexion');

const getHeroes = (req=query,res=response) => {
    
    let dataPorPagina =  req.query.resultadosPorPagina || 6;
    let paginaActual  = req.query.paginaActual || 1;
  
    let sql = `SELECT * FROM DATA_HEROES
                LIMIT ${dataPorPagina} 
                OFFSET ${(paginaActual-1)*dataPorPagina}`;

    try {
        pool.query(sql,(error,rows,fields)=>{
            try {
                if(error){
                    throw error
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

                    
                    res.status(200).json({
                        msg : 'ok',
                        data : new_rows
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
    let sql = `SELECT * FROM DATA_HEROES 
                WHERE localized_name = "${nombreHeroe}"`;

    try {
        pool.query(sql,(error,rows,fields)=>{
            try {
                if(error){
                    throw error
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

                    res.status(200).json({
                        msg : 'ok',
                        data : new_rows
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
    

    let sql = `SELECT localized_name FROM HEROES `;
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