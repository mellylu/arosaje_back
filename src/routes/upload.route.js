const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller')
const multer = require('multer')
var upload = multer()



router.post('/uploadPhotoUser', upload.single("file"), uploadController.uploadImage);



router.delete('/upload/:id', uploadController.deleteImage);


module.exports = router;