const express = require('express');
const router = express.Router();
const usersRouter = require('./user.route');
const annoncesRouter = require('./annonce.route');

router.use('/users/', usersRouter);
router.use('/annonces/', annoncesRouter);


module.exports = router;