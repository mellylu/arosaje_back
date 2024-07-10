const request = require('supertest');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { mockDeep, mockReset } = require('jest-mock-extended');
const conversationController = require('../src/controllers/message.controller');
const router = require('../src/routes/message.route');


jest.mock('@prisma/client', () => {
    const { mockDeep } = require('jest-mock-extended');
    const prismaMock = mockDeep();
    return {
      PrismaClient: jest.fn(() => prismaMock),
    };
  });
describe('Message Controller', () => {
  let app;
  let prisma;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/messages', router);
    const { PrismaClient } = require('@prisma/client');
    prisma = new PrismaClient();
  });

  afterEach(() => {
    mockReset(prisma);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/v1/messages', () => {
    it('should create a new message', async () => {
      const newMessage = {
        Id_Message: 1,
        text: "xxx",
        conversationId: 1,
        userId: 1,
        DateCreation: new Date(),
      };

      prisma.message.create.mockResolvedValue(newMessage);

      const response = await request(app)
        .post('/api/v1/messages')
        .send({
            text: "xxx",
            conversationId: 1,
            userId: 1,
        })
        .expect(201);

        expect(response.body).toEqual({
            ajout_message: true,
            content: {
              ...newMessage,
              DateCreation: newMessage.DateCreation.toISOString(),
            },
          });
          expect(prisma.message.create).toHaveBeenCalledTimes(1);
    });it('should return 500 if there is an error', async () => {
        prisma.message.create.mockRejectedValue(new Error('Error creating message'));
  
        const response = await request(app)
          .post('/api/v1/messages')
          .send({
            text: "xxx",
            conversationId: 1,
            userId: 1,
          })
          .expect(500);
        expect(response.body).toEqual({
          error: 500,
          message: 'Error creating message',
        });
      });
    });
})



