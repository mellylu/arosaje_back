const express = require('express');
const router = express.Router();
const usersRouter = require('./user.route');
const annoncesRouter = require('./annonce.route');
const uploadRouter = require('./upload.route');
const conseilRouter = require('./conseil.route');
const tokenRouter = require('./token.route');
const gardePlantesRouter = require('./gardePlantes.route');

router.use('/users/', usersRouter);
router.use('/annonces/', annoncesRouter);
router.use('/upload/', uploadRouter);
router.use('/conseils/', conseilRouter);
router.use('/token/', tokenRouter);
router.use('/gardePlantes/', gardePlantesRouter);


module.exports = router;