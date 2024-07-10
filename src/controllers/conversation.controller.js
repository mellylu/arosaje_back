const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.post = async(req, res) => {
    try {
        const conversation = await prisma.conversation.create({
            data: {
              user1Id: req.body.user1,
              user2Id: req.body.user2,
              annonceId : req.body.annonce
            },
          });
        res.status(201).send({ ajout_conversation: true, content: conversation });
      } catch (err) {
        res.status(500).send({
          error: 500,
          message: err.message
        });
      } finally {
        await prisma.$disconnect();
      }
}

exports.getAll = async (req, res) => {
    try {
      const conversations = await prisma.conversation.findMany();
      res.send({
        conversation: conversations
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
    try {
        const conversation = await prisma.conversation
         .findUnique({
            where: {
              Id_Conversation: parseInt(req.params.id),
            },
            include: {
             Messages:true,
             user1:true,
             user2:true
            },
          })
          res.status(200).send({ content: conversation });
        }
        catch(err){
          res.status(500).send({ message: err });
            
        }
    finally {
        await prisma.$disconnect();
      }
  }