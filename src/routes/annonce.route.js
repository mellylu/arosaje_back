const express = require('express');
const router = express.Router();
const annonceController = require('../controllers/annonce.controller')
/**
 * @swagger
 * /api/v1/annonces:
 *   get:
 *     summary: getAll annonces
 *     description: Renvoie la liste des annonces des plantes
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Numéro de la page pour la pagination, il affiche 5 annonces par 5
 *     responses:
 *       200:
 *         description: Affichage de toutes les annonces
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
 *                 Latitude: 49.115469,
 *                 Longitude:  -1.082814
 *                 Ville : Saint-Lô
 *       500:
 *         description: erreur dans l'affichage des annonces, 
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
 *         description: l'annonce a bien été ajoutée
 *       500:
 *         description: erreur dans ajout annonce, 
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
 *         description: affichage d'une annonce
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
 *               Latitude: 49.115469,
 *               Longitude:  -1.082814
 *               Ville : Saint-Lô
 *               Conseils : [{Id_Conseil : 2, DateCreation : 2024-02-19T14:18:10.391Z, Username : Anonyme, Message : Arrosez plus, ConseilId : 2}]
 *       500:
 *         description: message erreur
 *       404:
 *         description: annonce non trouvée
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
 *         description: annonce supprimée
 *       500:
 *         description: message d'erreur
 *       404:
 *         description: annonce non trouvée
 */
router.delete('/:id', annonceController.delete);

/**
 * @swagger
 * /api/v1/annonces/{id}:
 *   put:
 *     summary: update annonce
 *     description: Mettre à jour les informations d'une annonce spécifique dans la base de données par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'annonce à mettre à jour
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
 *     responses:
 *       200:
 *         description: Annonce modifiée
 *       500:
 *         description: Données de requête invalides
 *       404:
 *         description: Annonce non trouvée
 */
router.put('/:id', annonceController.update);


module.exports = router;