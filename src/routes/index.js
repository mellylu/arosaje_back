const express = require('express');
const router = express.Router();
const usersRouter = require('./user.route');
const annoncesRouter = require('./annonce.route');
const uploadRouter = require('./upload.route');
const conseilRouter = require('./conseil.route');
const tokenRouter = require('./token.route');
const gardePlantesRouter = require('./gardePlantes.route');
const conversationsRouter = require('./conversation.route');
const messagesRouter = require('./message.route');

router.use('/users/', usersRouter);
router.use('/annonces/', annoncesRouter);
router.use('/upload/', uploadRouter);
router.use('/conseils/', conseilRouter);
router.use('/token/', tokenRouter);
router.use('/gardePlantes/', gardePlantesRouter);
router.use('/conversations/', conversationsRouter);
router.use('/messages/', messagesRouter);


module.exports = router;



// "Titre": "Plante 1",
// "Description" : "xxxxxxxxx",
// "DateDebut" : "11/01/2024",
// "DateFin" : "15/01/2024",
// "Id_Plante" : ["https://res.cloudinary.com/melly-lucas/image/upload/v1704971723/Arosaje/annonces/plante_kqt4sg.avif", "https://res.cloudinary.com/melly-lucas/image/upload/v1704971723/Arosaje/annonces/plante2_ppix6p.avif"]
