const express = require('express');

const router = express.Router();
const {HeroeController} = require('../controllers/heroe');

router.get('/',HeroeController.getHeroes);
router.get('/heroe',HeroeController.getHeroByFilter);
router.get('/lista',HeroeController.getHeroNamesList);
router.get('/:id',HeroeController.getHeroById);


module.exports = router;