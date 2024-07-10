const request = require('supertest');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { mockDeep, mockReset } = require('jest-mock-extended');
const conversationController = require('../src/controllers/conversation.controller');
const router = require('../src/routes/conversation.route');

jest.mock('@prisma/client', () => {
    const { mockDeep } = require('jest-mock-extended');
    const prismaMock = mockDeep();
    return {
      PrismaClient: jest.fn(() => prismaMock),
    };
  });
describe('Conversation Controller', () => {
  let app;
  let prisma;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/conversations', router);
    const { PrismaClient } = require('@prisma/client');
    prisma = new PrismaClient();
  });

  afterEach(() => {
    mockReset(prisma);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/v1/conversations', () => {
    it('should create a new conversation', async () => {
      const newConversation = {
        Id_Conversation: 1,
        user1Id: 1,
        user2Id: 2,
        annonceId: 1,
        DateCreation: new Date(),
      };

      prisma.conversation.create.mockResolvedValue(newConversation);

      const response = await request(app)
        .post('/api/v1/conversations')
        .send({
          user1: 1,
          user2: 2,
          annonce: 1,
        })
        .expect(201);

        expect(response.body).toEqual({
            ajout_conversation: true,
            content: {
              ...newConversation,
              DateCreation: newConversation.DateCreation.toISOString(),
            },
          });
          expect(prisma.conversation.create).toHaveBeenCalledTimes(1);
    });it('should return 500 if there is an error', async () => {
        prisma.conversation.create.mockRejectedValue(new Error('Error creating conversation'));
  
        const response = await request(app)
          .post('/api/v1/conversations')
          .send({
            user1: 1,
            user2: 2,
            annonce: 1,
          })
          .expect(500);
  
        expect(response.body).toEqual({
          error: 500,
          message: 'Error creating conversation',
        });
      });
    });
  
    describe('GET /api/v1/conversations', () => {
      it('should return all conversations', async () => {
        const conversations = [
          {
            Id_Conversation: 1,
            user1Id: 1,
            user2Id: 2,
            annonceId: 1,
            DateCreation: new Date(),
          },
        ];
  
        prisma.conversation.findMany.mockResolvedValue(conversations);
  
        const response = await request(app)
          .get('/api/v1/conversations')
          .expect(200);
  
        expect(response.body).toEqual({
          conversation: conversations.map(conv => ({
            ...conv,
            DateCreation: conv.DateCreation.toISOString(),
          })),
        });
        expect(prisma.conversation.findMany).toHaveBeenCalledTimes(1);
      });
    });
  
    describe('GET /api/v1/conversations/:id', () => {
      it('should return a single conversation', async () => {
        const conversation = {
          Id_Conversation: 1,
          user1Id: 1,
          user2Id: 2,
          annonceId: 1,
          DateCreation: new Date(),
        };
  
        prisma.conversation.findUnique.mockResolvedValue(conversation);
  
        const response = await request(app)
          .get('/api/v1/conversations/1')
          .expect(200);
  
        expect(response.body).toEqual({
          content: {
            ...conversation,
            DateCreation: conversation.DateCreation.toISOString(),
          },
        });
        expect(prisma.conversation.findUnique).toHaveBeenCalledTimes(1);
      });
  
      it('should return 404 if conversation not found', async () => {
        prisma.conversation.findUnique.mockResolvedValue(null);
  
        const response = await request(app)
          .get('/api/v1/conversations/1')
          .expect(404);
  
        expect(response.body).toEqual({
          error: 'Conversation not found',
        });
        expect(prisma.conversation.findUnique).toHaveBeenCalledTimes(1);
      });
    });
  });