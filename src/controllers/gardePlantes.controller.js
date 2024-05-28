const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.post = async(req, res) => {
  const data = {
    UtilisateurProprietaire: {
      connect: { Id_Utilisateur: req.body.UtilisateurProprietaire }
    },
    UtilisateurGardien: {
      connect: { Id_Utilisateur: req.body.UtilisateurGardien }
    },
    Annonces: {
      connect: { Id_Annonce: req.body.Annonces }
    }
  };
  console.log(data)
    try {
    
        const gardePlantes = await prisma.gardePlantes.create({
          data: data
        });
        res.status(201).send({ ajout_gardePlantes: true, content: gardePlantes });
      } catch (err) {
        res.status(500).send({
          error: 500,
          message: err.message
        });
      } finally {
        await prisma.$disconnect();
      }
}

exports.getId = async(req, res) => {
    try {
        const gardePlantes = await prisma.gardePlantes
         .findMany({
            where: {
              UtilisateurGardienId: 3//parseInt(req.params.id),
            },
            include: {
              Annonces: true,
            },
          })
          res.status(200).send({ content: gardePlantes });
        }
        catch(err){
          res.status(500).send({ message: err });
            
        }
    finally {
        await prisma.$disconnect();
      }
}