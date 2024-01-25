const { query, response } = require('express');
const {handleError,handleSuccess} = require('../helpers/reponseHandle');
const {HeroeModel} = require('../models/heroes')

class HeroeController{
    static async getHeroes (req=query,res=response) {
    
        let {quantity=6} = req.query;
        try {
            const rows = await HeroeModel.getHeroes({quantity});  
            handleSuccess(res,rows);
        } catch (err) {
            handleError(res,400,'Bad request',err);
        }
    
    }

    //Retorna un array por atributo o un elemento por nombre
    static async getHeroByFilter  (req=query,res=response){
    
        let {name,attribute}  = req.query;
        try {
            const rows = await HeroeModel.getHeroByFilter({ name, attribute });
            handleSuccess(res,rows);
        } catch (err) {
        handleError(res,400,'Bad request',err);
    }
    
    }

    static async getHeroNamesList (req=query,res=response){
    
        try {
            const rows = await HeroeModel.getHeroNames();  
            handleSuccess(res,rows);
        } catch (err) {
            handleError(res,500,'Internal Server Error',err);
        }
    
    }

    static async getHeroById  (req=query,res=response){
    
        const {id} = req.params;
        try {
            const rows = await HeroeModel.getHeroById({id});
            handleSuccess(res,rows);
        } catch (err) {
            handleError(res,400,'Bad request',err);
        }
    
    }
}


module.exports = {
    HeroeController
}