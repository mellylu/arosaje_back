const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')

router.get('/', userController.getAll);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/verifyToken', userController.verifyToken);

module.exports = router;