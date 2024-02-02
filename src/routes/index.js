const express = require('express');
const router = express.Router();
const usersRouter = require('./user.route');
const annoncesRouter = require('./annonce.route');
const uploadRouter = require('./upload.route');
const conseilRouter = require('./conseil.route');

router.use('/users/', usersRouter);
router.use('/annonces/', annoncesRouter);
router.use('/upload/', uploadRouter);
router.use('/conseils/', conseilRouter);


module.exports = router;