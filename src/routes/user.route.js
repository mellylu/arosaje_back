const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const verifyToken = require('../helpers/verifyToken')

router.get('/', userController.getAll);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/verifyToken', userController.verifyToken);
router.get('/:id', verifyToken, userController.getId);


module.exports = router;