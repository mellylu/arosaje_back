const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/token.controller')

router.post('/', tokenController.sendEmailToResetPassword);
router.post('/formResetPassword', tokenController.formResetPassword);
router.put('/updatePassword', tokenController.updatepassword);

module.exports = router;