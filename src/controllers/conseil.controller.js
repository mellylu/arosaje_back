const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async(req, res) => {
    try {
        const conseils = await prisma.conseil.findMany();
        res.status(200).send({
          content: conseils
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

exports.post = async(req, res) => {
    try {
        const conseil = await prisma.conseil.create({
            data: req.body,
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