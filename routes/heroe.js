const express = require('express');

const router = express.Router();

const {getHeroes,getHeroe,getHeroeFiltro,listaNombresHeores,getHeroByAttribute } = require('../controllers/heroe');

router.get('/',getHeroes);
router.get('/filtro',getHeroeFiltro);
router.get('/attribute',getHeroByAttribute);
router.get('/lista',listaNombresHeores);

router.get('/:id',getHeroe);



module.exports = router;