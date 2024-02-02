const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//le tri descendant ascendant par titre et par date de début et les annonces au alentour de ta localisation

//A POSER COMME QUESTION AU PROF AVOIR DETAILS
//prise en photo de plantes et partage je sais pas ce que ça veut dire

//Ajout et visualisation de conseils concenant l'entretien d'une plante à faire garder
//ajout table message qui est reliée à l'id de l'annonce
//faire un get all des message
//faire un post de message

//faire les requêtes cloudinary pour ajouter un element, supprimer une photo etc

exports.getAll = async(req, res) => {
    try {
        const annonces = await prisma.annonce.findMany();
  
        //pagination par 5 annonces
        if (req.query.page != undefined){
          let annoncesPagination = []
          let nb = 5
          let top = false
          let bottom = false
          req.query.page = Number(req.query.page) * 5
          // if (nb + req.query.page >= annonces.length){
          //      top = true
          // }
          // if (req.query.page === 0){
          //      bottom = true
          // }
          for(let i = req.query.page; i < nb + req.query.page; i++){
              if(i<annonces.length){
                annoncesPagination.push(annonces[i])
              }
          }
          res.status(200).send({
            content: annoncesPagination
          });
       }


       if (req.query.lat && req.query.lng){
        const annoncesByLocalization = []
        annonces.filter( (element) => {
            req.query.lat=Number(req.query.lat)
            req.query.lng=Number(req.query.lng)
            if(element.localization.lat === req.query.lat && element.localization.lng === req.query.lng)
            {
              annoncesByLocalization.push(element)
            }
            element.localization.lat === req.body.lat && element.localization.lng === req.body.lng
        });
        data = v
      }

       
        res.status(200).send({
          content: annonces
        });
        
        
      } catch (err) {
        res.status(500).send({
          error: 500,
          message: err.message
        });
      } finally {
        await prisma.$disconnect();
      }
}




exports.postAnnonce = async(req, res) => {
    // if (req.body.Titre == undefined || req.body.length < 5 || req.body.length > 30){
    //     res.status(200).send({ ajout_annonce: false, message: "Le titre est obligatoire et doit contenir au minimum 5 caractères et au maximum 30 caractères" });
    // }
    // if (req.body.Desciption == undefined || req.body.length < 20 || req.body.length > 500){
    //     res.status(200).send({ ajout_annonce: false, message: "Le titre est obligatoire et doit contenir au minimum 5 caractères et au maximum 30 caractères" });
    // }
    if (req.body.Titre == undefined || req.body.Description == undefined || req.body.DateDebut == undefined || req.body.DateFin == undefined){
        res.status(200).send({ ajout_annonce: false, message: "Tous les champs sont obligatoires" });
    }
    
    else{
        if (req.body.Id_Plante == undefined || req.body.Id_Plante.length == 0){
            res.status(200).send({ ajout_annonce: false, message: "Vous devez déposer au moins une photo" });
        }
        else{

            try{
                
                req.body.DateDebut = convertirDateEnDateTime(req.body.DateDebut)
                req.body.DateFin = convertirDateEnDateTime(req.body.DateFin)
                const annonce = await prisma.annonce.create({
                    data: req.body,
                });
                res.status(201).send({ ajout_annonce: true, content: annonce });
        
            }
            catch(err){
                res.status(500).send({ ajout_annonce: false, message: err });
            }
            finally {
                await prisma.$disconnect();
            }
        }
    }  
}

function convertirDateEnDateTime(date) {
    let dateParts = date.split('/');
    let jsDate = new Date(parseInt(dateParts[2], 10), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[0], 10));

    jsDate.setHours(0, 0, 0, 0);
    let formattedDate = jsDate.toISOString();

    return formattedDate
    
}

exports.getId = async(req, res) => {
    try {
        const annonce = await prisma.annonce
         .findUnique({
            where: {
              Id_Annonce: parseInt(req.params.id),
            },
          })
          res.status(200).send({ content: annonce });
        }
        catch(err){
          res.status(500).send({ message: err });
            
        }
    finally {
        await prisma.$disconnect();
      }
}


exports.delete = async(req, res) => {
    try {
        const annonces = await prisma.annonce.delete({
            where: {
              Id_Annonce: parseInt(req.params.id)
            }})
        res.send({
          delete: true
        });
      } catch (err) {
        res.status(500).send({
          message: err.message
        });
      } finally {
        await prisma.$disconnect();
      }
}


exports.update = async(req, res) => {
  try {
    if (req.body.DateDebut){
      req.body.DateDebut = convertirDateEnDateTime(req.body.DateDebut)
    }
    if(req.body.DateFin){
      req.body.DateFin = convertirDateEnDateTime(req.body.DateFin)
    }
    const annonces = await prisma.annonce.update({
          where: {
            Id_Annonce: parseInt(req.params.id)
          },
          data: 
          {
            Titre : req.body.Titre,
            Description : req.body.Description,
            DateDebut : req.body.DateDebut,
            DateFin : req.body.DateFin,
            Id_Plante : req.body.Id_Plante,
            Longitude: req.body.Longitude,
            Latitude: req.body.Latitude,
            Ville: req.body.Ville
          }
        })
      res.status(200).send({
        update: true,
        annonce:annonces
      });
    } catch (err) {
      res.status(500).send({
        message: err.message
      });
    } finally {
      await prisma.$disconnect();
    }
}





//url secure : https://res.cloudinary.com/melly-lucas/image/upload/v1704971723/Arosaje/annonces/plante_kqt4sg.avif


//"https://res.cloudinary.com/melly-lucas/image/upload/v1704971723/Arosaje/annonces/plante_kqt4sg.avif", "https://res.cloudinary.com/melly-lucas/image/upload/v1704971723/Arosaje/annonces/plante2_ppix6p.avif"