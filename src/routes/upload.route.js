const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller')
const multer = require('multer')
var upload = multer()


/**
 * @swagger
 * /api/v1/upload/uploadPhotoUser:
 *   post:
 *     summary: post une image sur cloudinary
 *     description: |
 *       Ajoute une nouvelle image dans le dossier Arosaje/annonces sur Cloudinary.
 *       L'objet "file" envoyé doit inclure les champs suivants :
 *       - fieldname: Nom du champ (typiquement 'file').
 *       - originalname: Nom original du fichier.
 *       - encoding: Encodage du fichier.
 *       - mimetype: Type MIME du fichier.
 *       - buffer: Contenu binaire du fichier.
 *       - size: Taille du fichier en octets.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Fichier image à uploader.  
 *     responses:
 *       200:
 *         description: le fichier a été ajouté dans cloudinary et va retourner son identifiant
 *       401:
 *         description: problème de droit de cloudinary
 *       500:
 *         description: erreur dans ajout de l'image dans cloudinary, 
 */
router.post('/uploadPhotoUser', upload.single("file"), uploadController.uploadImage);


/**
 * @swagger
 * /api/v1/upload/upload/{id}:
 *   delete:
 *     summary: deleteId de l'image dans cloudinary
 *     description: Supprimer une image par son identifiant dans cloudinary
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'image à récupérer
 *     responses:
 *       200:
 *         description: image supprimée
 *       500:
 *         description: erreur dans la suppression de l'image, image non trouvée
 */
router.delete('/upload/:id', uploadController.deleteImage);


module.exports = router;