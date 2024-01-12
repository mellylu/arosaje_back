const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


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
        console.log(req.body)
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
        
        console.log(userToken, "usertoken")
        console.log(process.env.JWT_SECRET)
        res.status(200).send({ register: true, data: user, token: userToken });
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

