const request = require('supertest');
const app = require('../../../app');
const User = require('../../../app/models').user;

describe('POST /users', () => {
  afterEach(done => {
    jest.resetAllMocks();
    done();
  });

  it('Should create a user', async () => {
    const { statusCode } = await request(app)
      .post('/users')
      .send({
        firstName: 'Omar',
        lastName: 'Roa',
        email: 'oroa@wolox.com.ar',
        password: '123456'
      });

    const createdUser = await User.findOne({
      where: {
        email: 'oroa@wolox.com.ar'
      }
    });

    expect(statusCode).toEqual(201);
    expect(createdUser.firstName).toEqual('Omar');
    expect(createdUser.lastName).toEqual('Roa');
    expect(createdUser.email).toEqual('oroa@wolox.com.ar');
  });

  it('Should return a invalid validation email error', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        firstName: 'Omar',
        lastName: 'roa',
        email: 'oroa@wolox.com.co',
        password: '123456'
      });

    const createdUser = await User.findOne({
      where: {
        email: 'oroa@wolox.com.co'
      }
    });

    expect(response.body).toHaveProperty('internal_code', 'domain_email_error');
    expect(response.body).toHaveProperty('message', 'Domain is not valid');
    expect(createdUser).toBe(null);
  });

  it('Should return an existing email error', async () => {
    User.create({
      firstName: 'Andres',
      lastName: 'Roa',
      email: 'aroa@wolox.com.ar',
      password: '123456'
    });

    const response = await request(app)
      .post('/users')
      .send({
        firstName: 'Andres',
        lastName: 'Roa',
        email: 'aroa@wolox.com.ar',
        password: '123456'
      });

    const createdUser = await User.findOne({
      where: {
        email: 'aroa@wolox.com.ar'
      }
    });

    expect(response.body).toHaveProperty('internal_code', 'registered_email_error');
    expect(response.body).toHaveProperty('message', 'Email is already registered');
    expect(createdUser.firstName).toBe('Andres');
    expect(createdUser.lastName).toBe('Roa');
  });

  it('Should return a weak password validation error', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        firstName: 'Andres',
        lastName: 'Roa',
        email: 'aroa@wolox.com.ar',
        password: '123'
      });

    const createdUser = await User.findOne({
      where: {
        email: 'jdoe@wolox.com.ar'
      }
    });

    expect(response.body).toHaveProperty('internal_code', 'validation_error');
    expect(response.body).toHaveProperty('message', 'The password must be at least 6 characters long');
    expect(createdUser).toBe(null);
  });

  it('Should return a weak credentials validation error', async () => {
    User.create({
      firstName: 'Andres',
      lastName: 'Roa',
      email: 'aroa@wolox.com.ar',
      password: '123456'
    });

    const response = await request(app)
      .post('/users/sessions')
      .send({
        firstName: 'Andres',
        lastName: 'Roa',
        email: 'aroa@wolox.com.ar',
        password: '654321'
      });

    expect(response.body).toHaveProperty('internal_code', 'authentication_error');
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });
});
