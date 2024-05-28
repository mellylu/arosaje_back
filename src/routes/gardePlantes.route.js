const express = require('express');
const router = express.Router();
const gardePlantesController = require('../controllers/gardePlantes.controller')


router.get('/:id', gardePlantesController.getId);

router.post('/', gardePlantesController.post);

module.exports = router;