const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller')

router.get('/', messageController.getAll);

router.post('/', messageController.post);

module.exports = router;