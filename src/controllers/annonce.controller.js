const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.getAll = async(req, res) => {
  console.log(req.query, "req.query")
    try {
        let annonces = await prisma.annonce.findMany();
        console.log(annonces)

        annonces.sort((a, b) => {
          const dateA = new Date(a.DateCreation);
          const dateB = new Date(b.DateCreation);

          if (dateA > dateB) {
              return -1;
          }
          if (dateA < dateB) {
              return 1;
          }
          return 0;
        });

        //debut de ce que je rajoute

        if(req.query.IsVisiblePublication == 'true'){
          const annoncesFilter = []
          annonces = annonces.filter( (element) => {
              if(element.Etat === false)
              {
                  annoncesFilter.push(element)
              }
          });
          annonces = annoncesFilter
        }
        if(req.query.IsVisibleGardiennage == 'true'){
          const annoncesFilter = []
          annonces = annonces.filter( (element) => {
              if(element.Etat === true)
              {
                annoncesFilter.push(element)
              }
          });
          annonces = annoncesFilter
        }
        if(!req.query.IsVisiblePublication && !req.query.IsVisibleGardiennage){
          const annoncesFilter = []
          annonces = annonces.filter( (element) => {
              if(element.Etat === false)
              {
                  annoncesFilter.push(element)
              }
          });
          annonces = annoncesFilter
        }

        //fin de ce que je rajoute
console.log(annonces.length)
        if (req.query.Ville){
          const annoncesFilter = []
          annonces = annonces.filter( (element) => {
              if(element.Ville === req.query.Ville)
              {
                  annoncesFilter.push(element)
              }
          });
          annonces = annoncesFilter
        }
        console.log(annonces.length, "ll")
  
        //pagination par 5 annonces
        if (req.query.page != undefined){
          let annoncesPagination = []
          let nb = 5
          let top = false
          let bottom = false
          req.query.page = Number(req.query.page) * nb
          for(let i = req.query.page; i < nb + req.query.page; i++){
              if(i<annonces.length){
                annoncesPagination.push(annonces[i])
              }
          }
          // res.status(200).send({
          //   content: annoncesPagination
          // });
          annonces = annoncesPagination
       }

      //  if (req.query.Latitude && req.query.Longitude){
      //       console.log("rrrrrrrrrr")
      //       const v = []
      //       annonces = annonces.filter( (element) => {
      //           req.query.Latitude=Number(req.query.Latitude)
      //           req.query.Longitude=Number(req.query.Longitude)
      //           console.log(element)
      //           // if(element.localization.Latitude === req.query.lat && element.localization.lng === req.query.lng)
      //           // {
      //           //     v.push(element)
      //           // }
      //           // element.localization.lat === req.body.lat && element.localization.lng === req.body.lng
      //       });
      //       data = v
      //       res.status(200).send({
      //         annonce:annonces
      //       });
      //     }

     
       
         res.status(200).send({
           content: annonces
         });

        
      } catch (err) {
        console.log(err)
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
    console.log(req.body)
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
               // req.body.AnnonceUser = 1
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
            include: {
              Conseils: true,
              Annonce:true,
              AnnonceGardien:true,
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
  console.log(parseInt(req.params.id), "FFFF")
    try {
      const conseils = await prisma.conseil.deleteMany({
        where: {
          ConseilId: parseInt(req.params.id)
        }})
        try{
          const annonces = await prisma.annonce.delete({
            where: {
              Id_Annonce: parseInt(req.params.id)
            }})
        res.status(200).send({
          delete: true
        });
        }
        catch(err) {
          console.log(err)
          res.status(500).send({
            message: err.message
            
          })
        }

       
      } catch (err) {
        console.log(err)
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
            Ville: req.body.Ville,
            EtatPlantes: req.body.EtatPlantes,
            AnnonceUserGard : req.body.AnnonceUserGard,
            Etat:req.body.Etat

          }
        })
      res.status(200).send({
        update: true,
        annonce:annonces
      });
    } catch (err) {
      console.log(err)
      res.status(500).send({
        message: err.message
      });
    } finally {
      await prisma.$disconnect();
    }
}



exports.getAllFilter = async(req, res) => {
  console.log("FFFFFFFFFFF")
  // try {
  //   console.log("fffffff")
  //   const annonces = await prisma.annonce.findMany();
  //   console.log(req.query.Latitude)
  //   if (req.query.Latitude && req.query.Longitude){
  //     console.log("rrrrrrrrrr")
  //     const v = []
  //     annonces = annonces.filter( (element) => {
  //         req.query.Latitude=Number(req.query.Latitude)
  //         req.query.Longitude=Number(req.query.Longitude)
  //         console.log(element)
  //         // if(element.localization.Latitude === req.query.lat && element.localization.lng === req.query.lng)
  //         // {
  //         //     v.push(element)
  //         // }
  //         // element.localization.lat === req.body.lat && element.localization.lng === req.body.lng
  //     });
  //     data = v
  //     res.status(200).send({
  //       annonce:annonces
  //     });
  //   }
  //   } catch (err) {
  //     res.status(500).send({
  //       message: err.message
  //     });
  //   } finally {
  //     await prisma.$disconnect();
  //   }
}


//url secure : https://res.cloudinary.com/melly-lucas/image/upload/v1704971723/Arosaje/annonces/plante_kqt4sg.avif


//"https://res.cloudinary.com/melly-lucas/image/upload/v1704971723/Arosaje/annonces/plante_kqt4sg.avif", "https://res.cloudinary.com/melly-lucas/image/upload/v1704971723/Arosaje/annonces/plante2_ppix6p.avif"
//cf2n96vnymuxuogwarmr