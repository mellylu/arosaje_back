const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async(req, res) => {
    try {
        const conseils = await prisma.conseil.findMany();
        if (req.query.page != undefined){
          let conseilsPagination = []
          let nb = 3
          let top = false
          let bottom = false
          req.query.page = Number(req.query.page) * nb
          for(let i = req.query.page; i < nb + req.query.page; i++){
              if(i<conseils.length){
                conseilsPagination.push(conseils[i])
              }
          }
          console.log(conseilsPagination)
          res.status(200).send({
            content: conseilsPagination
          });

        }
        else{
          res.status(200).send({
            content: conseils
          });
        }
      } catch (err) {
        res.status(500).send({
          error: 500,
          message: err.message
        });
      } finally {
        await prisma.$disconnect();
      }
}


exports.post = async(req, res) => {
    try {
        const conseil = await prisma.conseil.create({
          data: {
            Message: req.body.Message,
            ConseilId: parseInt(req.body.ConseilId)
        }
        });
        res.status(201).send({ ajout_conseil: true, content: conseil });
      } catch (err) {
        res.status(500).send({
          error: 500,
          message: err.message
        });
      } finally {
        await prisma.$disconnect();
      }
}