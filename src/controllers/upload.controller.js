const streamifier = require('streamifier'); 
const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });


exports.uploadImage = (req, res) => {
    console.log(req.file)
    if (req.file) { 
        let cld_upload_stream = cloudinary.uploader.upload_stream( 
            { 
            folder : "Arosaje/annonces" 
            }, 
            function(error, result) { 
                if (error){
                    console.log(error)
                    res.status(500).send({upload:false, message:error})
                }
                if (result){
                    console.log(result)
                    res.status(200).send({upload: true, message:result})
                }
            }
        ); 
        streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream)  
    }
    else{
        res.status(500).json({message : "Vous devez choisir une image"})
    }
    
}

exports.deleteImage = (req, res) => {
    console.log(req.params.id)
    cloudinary.api.delete_resources(`Arosaje/annonces/${req.params.id}`, function(error, result) {
        if (result){
            if (result.deleted[`Arosaje/annonces/${req.params.id}`] === "deleted")
            {
                res.status(200).json({delete : true})
            }
            else{
                res.status(500).json({delete: false})
            }
        }
        else{
            res.status(500).json({delete : false})
        }
    }); 
}
