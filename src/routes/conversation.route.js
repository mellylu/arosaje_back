const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversation.controller')

router.get('/', conversationController.getAll);

router.post('/', conversationController.post);

router.get('/:id', conversationController.getId);

module.exports = router;