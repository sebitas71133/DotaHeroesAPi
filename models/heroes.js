const pool = require('../database/conexion');

class HeroeModel {
    static async getHeroes({quantity}) {
        let sql = `SELECT * FROM DATA_HEROES
                LIMIT ${quantity}`;
        try {
            const [rows, fields] = await pool.promise().query(sql);
            const newRows = calculateAdditionalAttributes(rows);
            return newRows;
        } catch (err) {
            throw err;
        }
    };


    static async getHeroByFilter({name="",attribute=""}){
        try {

            if(name){
                let sql = `SELECT * FROM DATA_HEROES 
                    WHERE localized_name = "${name}"`;
                const [rows,field] = await pool.promise().query(sql);
                const newRows = calculateAdditionalAttributes(rows);
                return newRows[0];
            }else if(attribute){
                let sql = `SELECT * FROM DATA_HEROES 
                WHERE primary_attr = "${attribute}" `;
                const [rows,field] = await pool.promise().query(sql);
                const newRows = calculateAdditionalAttributes(rows);
                return newRows;
            }else{
                throw new Error('Se requiere al menos un parametro');
            }

        } catch (err) {
            throw err;
        }
    }

    static async getHeroNames() {
        let sql = `SELECT localized_name FROM HEROES `;    
        try {
            const [rows, fields] = await pool.promise().query(sql);
            return rows;
        } catch (err) {
            throw err;
        }
    };

    static async getHeroById({id}) {
        let sql = 'select * FROM DATA_HEROES where id= ?';
        try {
            const [rows, fields] = await pool.promise().query(sql,[id]);
            const newRows = calculateAdditionalAttributes(rows);
            return newRows[0];
        } catch (err) {
            throw err;
        }
    };

    
}


function calculateAdditionalAttributes(rows){
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

    return new_rows;
      
}

module.exports = {
    HeroeModel,
}