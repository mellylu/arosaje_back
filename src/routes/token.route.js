const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/token.controller')


/**
 * @swagger
 * /api/v1/token/sendEmailToResetPassword:
 *   post:
 *     summary: envoie email si mot de passe oublié
 *     description: va envoyer un email à l'utilisateur en joignant un nouveau token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *                 description: email de l'utilisateur
 *       200:
 *         description: l'email a bien été envoyé
 *       500:
 *         description: Données de requête invalides
 *       404:
 *         description: Route non trouvée
 */
router.post('/', tokenController.sendEmailToResetPassword);


/**
 * @swagger
 * /api/v1/token/updatePassword:
 *   post:
 *     summary: vérifier si le token existe et à quel utilisateur il appartient
 *     description: vérifier si le token existe et à quel utilisateur il appartient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: nouveau token de l'utilisateur
 *       200:
 *         description: retourne l'identifiant de l'utilisateur
 *       500:
 *         description: Données de requête invalides
 *       404:
 *         description: Route non trouvée
 */
router.post('/formResetPassword', tokenController.formResetPassword);


/**
 * @swagger
 * /api/v1/token/updatePassword:
 *   put:
 *     summary: update mdp user
 *     description: Mettre à jour le mot de passe d'un utilisateur spécifique dans la base de données par son ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id_Utilisateur:
 *                 type: string
 *                 description: nouveau mot de passe de l'utilisateur
 *               Mdp:
 *                 type: number
 *                 description: id de l'utilisateur
 *       200:
 *         description: Mot de passe modifié
 *       500:
 *         description: Données de requête invalides
 *       404:
 *         description: Route non trouvée
 */
router.put('/updatePassword', tokenController.updatepassword);

module.exports = router;