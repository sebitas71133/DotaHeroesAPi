const express = require('express');

const router = express.Router();

const {getHeroes,getHeroe,getImageHeroe,getHeroeFiltro,listaNombresHeores } = require('../controllers/heroe');

router.get('/',getHeroes);
router.get('/filtro',getHeroeFiltro);
router.get('/lista',listaNombresHeores);

router.get('/:id',getHeroe);
router.get('/image/:id',getImageHeroe);


module.exports = router;