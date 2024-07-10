const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// exports.post = async(req, res) => {
//     // try {
//     //     const message = await prisma.message.create({
//     //         data: {
//     //           text: req.body.text,
//     //           conversationId: req.body.conversationId,
//     //           userId: req.body.userId,
//     //         },
//     //       });
//     const { text, conversationId, userId } = req.body;

//     try {
//       // Vérifier si la conversation existe
//       const existingConversation = await prisma.conversation.findUnique({
//         where: {
//           Id_Conversation: conversationId,
//         },
//       });
  
//       if (!existingConversation) {
//         return res.status(404).json({ error: 'Conversation not found' });
//       }
  
//       // Créer le message
//       const message = await prisma.message.create({
//         data: {
//           text,
//           conversationId,
//           userId,
//         },
//       });
//         res.status(201).send({ ajout_message: true, content: message });
//       } catch (err) {
//         res.status(500).send({
//           error: 500,
//           message: err.message
//         });
//       } finally {
//         await prisma.$disconnect();
//       }
// }

exports.post = async(req, res) => {
  try {
      const message = await prisma.message.create({
          data: {
            text: req.body.text,
            conversationId: req.body.conversationId,
            userId: req.body.userId,
          },
        });
      res.status(201).send({ ajout_message: true, content: message });
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
      const messages = await prisma.message.findMany();
      res.send({
        message: messages
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