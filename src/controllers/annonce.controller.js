const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.getAll = async(req, res) => {
    try {
        const annonces = await prisma.annonce.findMany();
        res.send({
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
                console.log(annonce)
                res.status(200).send({ ajout_annonce: true, content: annonce });
        
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
          delete: true,
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


exports.update = async(req, res) => {
  try {
      const annonces = await prisma.annonce.update({
          where: {
            Id_Annonce: parseInt(req.params.id)
          },
          data: {
            Titre : req.body.Titre,
            Description : req.body.Description,
            //DateDebut :,
            //DateFin : ,
            //Id_Plante : 
          }
        })
      res.send({
        delete: true,
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