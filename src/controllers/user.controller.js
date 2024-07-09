const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var secret = process.env.JWT_SECRET;



exports.register = async(req, res) => {
  if (req.body.Nom == undefined || req.body.Prenom == undefined || req.body.Pseudo == undefined || req.body.Email == undefined || req.body.Ville == undefined){
    res.status(200).send({register:false, message:"Tous les champs sont obligatoires"})
  }
  
  else{
    if (req.body.Mdp.length < 8){
      res.status(200).send({register:false, message:"Le mot de passe doit contenir au minimum 8 caractères"})
    }
    //si l'adresse existe déjà c'est qu'il y a déjà un compte donc renvoyer déjà un compte car la fonction se crache mais faut préciser pourquoi
    else{
      try{
        req.body.Mdp = await bcrypt.hash(req.body.Mdp, 10);
     
       
        const users = await prisma.user
        .findUnique({
           where: {
             Email: req.body.Email,
           },
         })
         if (users){
          res.status(200).send({register:false, message:"Un compte est déjà rattaché à cette adresse mail"})
         }
         else{
            const user = await prisma.user.create({
              data: req.body,
            });
            
            
            let userToken = jwt.sign(
            {
              id: user.Id_Utilisateur,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: 86400,
            },
            )
            res.status(201).send({ register: true, data: user, token: userToken });
         }
        // console.log(userToken, "usertoken")
        // console.log(process.env.JWT_SECRET)
        
      }
      catch(err){
        res.status(500).send({ register: false, message: err });
      }
      finally {
        await prisma.$disconnect();
      }
    }
    
  }
}


exports.login = async(req, res) => {
  try{
    const user = await prisma.user
    .findUnique({
       where: {
         Email: req.body.Email,
       },
     })
     
     let passwordValid = bcrypt.compareSync(req.body.Mdp, user.Mdp)
     if (!passwordValid) {
        return res.status(401).send({
            message: "password not valid",
            auth: false,
            token: null
        })
      }
      console.log(user, "USER")
      let userToken = jwt.sign({
          id: user.Id_Utilisateur,
      },
      secret,
      {
          expiresIn: 86400
      })
      console.log(user, "user")
      res.status(200).send({
          auth: true,
          token: userToken,
          pseudo: user.Pseudo,
          id : user.Id_Utilisateur,
          image : user.Image,
          botanniste : user.Botanniste
          // username: user.username,
          // id: user._id,
          // image: user.image,
      })
  }
  catch(err){
    res.status(404).send({ error: `err : ${err}` })
  }
  
}

exports.getAll = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.send({
      user: users
    });
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err.message
    });
  } finally {
    await prisma.$disconnect();
  }
};


exports.getId = async(req, res) => {
  console.log(req.params, "req params")
  try {
      const user = await prisma.user
       .findUnique({
          where: {
            Id_Utilisateur: parseInt(req.params.id),
          },
          include: {
            Annonces: true,
            // UserGardien:true,
            Gardiennage:true,
            conversations1: {
              include: {
                Messages: true,
              },
            },
            conversations2:{
              include: {
              Messages: true,
            },
          }
           
          },
        })
        res.status(200).send({ content: user });
      }
      catch(err){
        res.status(500).send({ message: err });
          
      }
  finally {
      await prisma.$disconnect();
    }
}


exports.putId = async(req, res) => {
  console.log(req.params.id)
  console.log(req.body)
  try{
  const user = await prisma.user.update({
    where: {
      Id_Utilisateur: parseInt(req.params.id)
    },
    data: 
    {

      Civilite : req.body.Civilite,
      Pseudo : req.body.Pseudo,
      Prenom : req.body.Prenom,
      Nom : req.body.Nom,
      Email : req.body.Email,
      Longitude: req.body.Longitude,
      Latitude: req.body.Latitude,
      Ville: req.body.Ville,
      Image: req.body.Image,
      Botanniste: req.body.Botanniste

    }
  })
  
  res.status(200).send({
    update: true,
    user:user
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
