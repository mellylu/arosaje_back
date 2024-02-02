const express = require('express');
const router = express.Router();
const annonceController = require('../controllers/annonce.controller')
/**
 * @swagger
 * /api/v1/annonces:
 *   get:
 *     summary: getAll annonces
 *     description: Renvoie la liste des annonces des plantes
 *     responses:
 *       200:
 *         description: getAll annonces
 *         content:
 *           application/json:
 *             example:
 *               - Id_Annonce: 1
 *                 Id_Plante: []
 *                 Titre: Plante 1
 *                 Description: description de la plante
 *                 Etat: false
 *                 DateDebut: 
 *                 DateFin: 
 *                 DateCreation: 2024-02-02T14:35:22.158Z

 */
router.get('/', annonceController.getAll);


/**
 * @swagger
 * /api/v1/annonces:
 *   post:
 *     summary: post annonce
 *     description: Ajouter une nouvelle annonce à la base de données
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Titre:
 *                 type: string
 *                 description: Nom de l'annonce / de la plante
 *               Description:
 *                 type: string
 *                 description: Description de l'annonce / de la plante
 *               DateDebut:
 *                 pattern: "^[0-9]{2}/[0-9]{2}/[0-9]{4}$"
 *                 description: Date de fin de gardiennage de la plante au format "DD/MM/YYYY"
 *               DateFin:
 *                 pattern: "^[0-9]{2}/[0-9]{2}/[0-9]{4}$"
 *                 description: Date de fin de gardiennage de la plante au format "DD/MM/YYYY"
 *               Id_Plante:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Date à fin de gardiennage de la plante
 *              
 *     responses:
 *       201:
 *         description: Annonce ajouté avec succès
 *       400:
 *         description: Données de requête invalides
 */
router.post('/', annonceController.postAnnonce);

/**
 * @swagger
 * /api/v1/annonces/{id}:
 *   get:
 *     summary: getId annonce
 *     description: Récupérer une annonce par son identifiant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'annonce à récupérer
 *     responses:
 *       200:
 *         description: Les détails de l'utilisateur
 *         content:
 *           application/json:
 *             example:
 *               Id_Annonce: 1
 *               Id_Plante: []
 *               Titre: Plante 1
 *               Description: description de la plante
 *               Etat: false
 *               DateDebut: 
 *               DateFin: 
 *               DateCreation: 2024-02-02T14:35:22.158Z
 *       404:
 *         description: annonce non trouvé
 */
router.get('/:id', annonceController.getId);

/**
 * @swagger
 * /api/v1/annonces/{id}:
 *   delete:
 *     summary: deleteId annonce
 *     description: Supprimer une annonce par son identifiant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'annonce à récupérer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: annonce non trouvé
 */
router.delete('/:id', annonceController.delete);


module.exports = router;