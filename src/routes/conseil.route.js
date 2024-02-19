const express = require('express');
const router = express.Router();
const conseilController = require('../controllers/conseil.controller')

// * /api/v1/annonces/{id}:
// *   get:
// *     summary: getId annonce
// *     description: Récupérer une annonce par son identifiant
// *     parameters:
// *       - in: path
// *         name: id
// *         required: true
// *         schema:
// *           type: integer
// *         description: ID de l'annonce à récupérer



/**
 * @swagger
 * /api/v1/conseils/:
 *   get:
 *     summary: getAll conseils
 *     description: Renvoie la liste des conseils
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Numéro de la page pour la pagination, il affiche 3 conseils par 3
 *     responses:
 *       200:
 *         description: Affichage de tous les conseils
 *         content:
 *           application/json:
 *             example:
 *               - Id_Conseil : 1
 *               - DateCreation : 2024-02-19T14:18:10.391Z
 *               - Username : Anonyme
 *               - Message : il faut couper la tige de la fleur d'une longueur de 2 cm
 *               - ConseilId : 2
 *       500:
 *         description: erreur dans l'affichage des conseils, 
 */
router.get('/', conseilController.getAll);

/**
 * @swagger
 * /api/v1/conseils:
 *   post:
 *     summary: post conseil
 *     description: Ajouter un nouveau conseil à la base de données
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Message:
 *                 type: string
 *                 description: Ecrire le contenu du message
 *               ConseilId:
 *                 type: int
 *                 description: l'id de l'annonce auquel on veut ajouter un conseil
 *     responses:
 *       201:
 *         description: le conseil a bien été ajoutée
 *       500:
 *         description: erreur dans ajout du conseil l'identifiant de l'annonce n'est pas valide
 */
router.post('/', conseilController.post);

module.exports = router;