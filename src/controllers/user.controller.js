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
            res.status(200).send({ register: true, data: user, token: userToken });
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
  console.log("rrrrrrr")
  try{
    const user = await prisma.user
    .findUnique({
       where: {
         Email: req.body.Email,
       },
     })
     console.log(req.body.Email)
     console.log(user)
     console.log(req.body.Mdp)
     console.log(user.Mdp)
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
      res.status(200).send({
          auth: true,
          token: userToken,
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


exports.verifyToken = (req, res, next) => {
    
  let token = req.headers.authorization

  if (!token) {
    
    return res.status(403).send({
        auth : false,
        token : null,
        message : 'Missing token'
    })
  }
  jwt.verify(token, process.env.JWT_SECRET,
  function(error, jwtdecoded) { 

    if (error) {
        next();
        return res.status(401).send({
            auth : false,
            token : null,
            message : "not authorized"
        })
    }
    else{
        return res.status(200).send({
            auth : true,
        })
    }
    
  })
}


exports.getId = async(req, res) => {
  try {
      const user = await prisma.user
       .findUnique({
          where: {
            Id_Utilisateur: parseInt(req.params.id),
          },
          include: {
            Annonces: true,
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

