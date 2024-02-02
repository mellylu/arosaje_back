const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller')
const multer = require('multer')
var upload = multer()



/**
 * @swagger
 * /api/v1/upload/uploadPhotoUser:
 *   post:
 *     summary: post cloudinary
 *     description: Ajouter une image de plante dans cloudinary, si l'utilisateur met plusieurs plantes et valide il faudra boucler sur les images et appeler ce chemin pour chaque image
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               File:
 *                 type: object
 *                     properties:
 *                       file:
 *                         type: object
 *                         properties:
 *                           XX:
 *                              type: string
 *                              description: je sais pas encore à vérifier ce qu'il y a dedans et le type
 *                       upload_preset:
 *                         type: string
 *                         description: ml_default
 *               
 *     responses:
 *       200:
 *         description: l'image a été ajoutée à cloudinary
 *       500:
 *         description: erreur dans l'ajout de l'image sur cloudinary, 
 */
router.post('/uploadPhotoUser', upload.single("file"), uploadController.uploadImage);



/**
 * @swagger
 * /api/v1/upload/upload/{id}:
 *   delete:
 *     summary: deleteId image cloudinary
 *     description: Supprimer une image dans cloudinary
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'annonce à récupérer
 *     responses:
 *       200:
 *         description: image de cloudinary supprimée
 *       500:
 *         description: erreur dans suppression d'image
 *       404:
 *         description: image non trouvée
 */
router.delete('/upload/:id', uploadController.deleteImage);


module.exports = router;