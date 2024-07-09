const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const verifyToken = require('../helpers/verifyToken')

router.get('/', userController.getAll);

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: post user
 *     description: Ajouter un nouvel utilisateur à la base de données
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Civilite:
 *                 type: string
 *                 description: F (Feminin) ou M (Masculin) ou O (Other)
 *               Nom:
 *                 type: string
 *                 description: Nom de l'utilisateur
 *               Prenom:
 *                 type: string
 *                 description: Prenom de l'utilisateur
 *               Pseudo:
 *                 type: string
 *                 description: Pseudo de l'utilisateur
 *               Email:
 *                 type: string
 *                 description: Email de l'utilisateur
 *               Mdp:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *               Longitude:
 *                 type: number
 *                 format: float
 *                 description: Coordonnées géographique Lng
 *               Latitude:
 *                 type: number
 *                 format: float
 *                 description: Coordonnées géographique Lat
 *               Ville:
 *                 type: string
 *                 description: Ville correspondant aux données géographiques
 *              
 *     responses:
 *       200:
 *         description: les champs n'ont pas correctement été remplis
 *       201:
 *         description: l'utilisateur a bien été ajouté
 *       500:
 *         description: erreur dans ajout d'un utilisateur, 
 */
router.post('/register', userController.register);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: login user
 *     description: Connexion ud'un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *                 description: Email de l'utilisateur
 *               Mdp:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *               
 *     responses:
 *       200:
 *         description: l'utilisateur est bien connecté et la reponse renvoie le token
 *       500:
 *         description: erreur dans la connexion d'un utilisateur, 
 */
router.post('/login', userController.login);


/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: getId user
 *     description: Récupérer un utilisateur par son identifiant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utlisateur à récupérer
 *     responses:
 *       200:
 *         description: affichage d'un utilisateur
 *         content:
 *           application/json:
 *             example:
 *               Id_Utilisateur: 1
 *               Civilite: F
 *               Pseudo: MellyLu
 *               Prenom: Melly
 *               Nom: Lucas
 *               Email: melly.lucas32@yahoo.fr 
 *               Mdp: knsf$dg$dg55g$54dg
 *               Latitude: 49.115469,
 *               Longitude:  -1.082814
 *               Ville : Saint-Lô
 *               Botanniste : false
 *               Annonces : [{Id_Annonce : 1, Id_Plante : ["https://res.cloudinary.com/melly-lucas/image/upload/v1714487527/Arosaje/annonces/wxepdqkef78lzwevumjj.webp"], Titre: Plante 1, Description: description de la plante, Etat: false, DateDebut: 11/05/2024, DateFin: 19/05/2024, DateCreation: 2024-02-02T14:35:22.158Z, Latitude: 49.115469, Longitude:  -1.082814, Ville : Saint-Lô, Conseils : [{Id_Conseil : 2, DateCreation : 2024-02-19T14:18:10.391Z, Username : Anonyme, Message : Arrosez plus, ConseilId : 2}]}]
 *       500:
 *         description: message erreur
 *       404:
 *         description: utilisateur non trouvée
 */
// router.get('/:id', verifyToken, userController.getId);
router.get('/:id',userController.getId);

router.put('/:id',  userController.putId);


module.exports = router;