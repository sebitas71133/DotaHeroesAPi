const { query, response } = require('express');
const {handleError,handleSuccess} = require('../helpers/reponseHandle');
const {HeroeModel} = require('../models/heroes')


const getHeroes = async (req=query,res=response) => {
    
  
    let {quantity=6} = req.query;
    try {
        rows = await HeroeModel.getHeroes({quantity});  
        handleSuccess(res,rows);
    } catch (err) {
        handleError(res,400,'Bad request',err);
    }

}
//Retorna un array por atributo o un elemento por nombre
const getHeroByFilter= async (req=query,res=response) => {
    
    let {name,attribute}  = req.query;
    try {
        rows = await HeroeModel.getHeroByFilter({ name, attribute });
        handleSuccess(res,rows);
    } catch (err) {
        handleError(res,400,'Bad request',err);
    }
}


const getHeroNamesList = async (req=query,res=response) => {
    
    try {
        rows = await HeroeModel.getHeroNames();  
        handleSuccess(res,rows);
    } catch (err) {
        handleError(res,500,'Internal Server Error',err);
    }

}

const getHeroById= async (req=query,res=response) => {
    
    const {id} = req.params;
    try {
        rows = await HeroeModel.getHeroById({id});
        handleSuccess(res,rows);
    } catch (err) {
        handleError(res,400,'Bad request',err);
    }
}


module.exports = {
    getHeroes,
    getHeroByFilter,
    getHeroById,
    getHeroNamesList
}