const request = require('supertest');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { mockDeep, mockReset } = require('jest-mock-extended');
const userController = require('../src/controllers/user.controller');
const router = require('../src/routes/user.route');
const verifyToken = require('../src/helpers/verifyToken');
const jwt = require('jsonwebtoken');

jest.mock('@prisma/client', () => {
    const { mockDeep } = require('jest-mock-extended');
    const prismaMock = mockDeep();
    return {
      PrismaClient: jest.fn(() => prismaMock),
    };
  });
describe('user Controller', () => {
  let app;
  let prisma;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/users', verifyToken, router);
    const { PrismaClient } = require('@prisma/client');
    prisma = new PrismaClient();
  });

  afterEach(() => {
    mockReset(prisma);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
  describe('GET /api/v1/users/:id', () => {
    it('should return a single user', async () => {
      const user = {
            Id_Utilisateur: 1,
            Nom: 'User 1',
            Email: 'user1@example.com',
            Civilite: 'femme',
            Pseudo: 'user1',
            Mdp: 'test',
            Latitude: 1,
            Longitude: 1,
            Ville: 'Lison',
            Prenom: 'User 1',
      };
      jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
        callback(null, { userId: 1 });
    });

      prisma.user.findUnique.mockResolvedValue(user);

      const response = await request(app)
        .get('/api/v1/users/1')
        .set('authorization', 'Bearer token_test')
        .expect(200);

      expect(response.body).toEqual({
        content: {
          ...user,
        },
      });
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should return 401 if token is not correct', async () => {
        const user = {
            Id_Utilisateur: 1,
            Nom: 'User 1',
            Email: 'user1@example.com',
            Civilite: 'femme',
            Pseudo: 'user1',
            Mdp: 'test',
            Latitude: 1,
            Longitude: 1,
            Ville: 'Lison',
            Prenom: 'User 1',
      };
      jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
        callback(new Error('Token verification failed'), null);
    });
      prisma.user.findUnique.mockResolvedValue(user);

      const response = await request(app)
        .get('/api/v1/users/1')
        .set('authorization', 'Bearer token_test_faux')
        .expect(401);
      expect(response.body).toEqual({
       auth: false, token: null, message: 'not authorized'
      });
      prisma.user.findUnique.mockResolvedValue(0);
    });

  });
});