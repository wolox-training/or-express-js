const request = require('supertest');
const { factory } = require('factory-girl');
const app = require('../../../app');
const UserModel = require('../../../app/models').user;

factory.define('user', UserModel, {});

jest.mock('../../../app/middlewares/validateJwt.js', () => (req, res, next) => {
  if (!req.headers.authorization) return res.sendStatus(401);
  req.user = { id: 1, email: 'johnr@wolox.com.ar' };
  return next();
});

describe('POST /weets', () => {
  beforeEach(() => {
    factory.create('user', {
      id: 1,
      firstName: 'Jhon',
      lastName: 'Rio',
      password: '123456',
      email: 'johnr@wolox.com.ar'
    });
  });

  it('Should return a non authorized error', async () => {
    await request(app)
      .post('/weets')
      .expect(401);
  });

  it('Should create a weet', async () => {
    const { statusCode, body } = await request(app)
      .post('/weets')
      .set('Authorization', 'Bearer abc');

    expect(statusCode).toEqual(201);
    expect(body.id).toBeDefined();
    expect(body.content).toBeDefined();
    expect(body.user).toBe(1);
  });
});
