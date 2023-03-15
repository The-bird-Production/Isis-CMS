const request = require('supertest');
const app = require('../app');

describe('Test all routes', () => {
  test('GET /test should return Hello World', async () => {
    const response = await request(app).get('/test');
    expect(response.statusCode).toBe(200);
    
  });

  /* test('POST /users should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('User created successfully!');
  });

  // Test toutes les autres routes ici */
});