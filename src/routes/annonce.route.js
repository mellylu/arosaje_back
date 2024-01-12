const express = require('express');
const router = express.Router();
const annonceController = require('../controllers/annonce.controller')

router.get('/', annonceController.getAll);
router.post('/', annonceController.postAnnonce);
router.get('/:id', annonceController.getId);
router.delete('/:id', annonceController.delete);


module.exports = router;