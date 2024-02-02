const express = require('express');
const router = express.Router();
const conseilController = require('../controllers/conseil.controller')

router.get('/', conseilController.getAll);
router.post('/', conseilController.post);

module.exports = router;