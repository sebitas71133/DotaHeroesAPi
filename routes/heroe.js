const express = require('express');

const router = express.Router();

const {getHeroes,getHeroById,getHeroByFilter,getHeroNamesList } = require('../controllers/heroe');

router.get('/',getHeroes);
router.get('/heroe',getHeroByFilter);
router.get('/lista',getHeroNamesList);
router.get('/:id',getHeroById);


module.exports = router;