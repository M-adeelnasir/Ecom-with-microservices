import request from 'supertest';
import { app } from '../utils/app';

const URI = '/api/v1/users/signup';

describe('User', () => {
  describe('create user', () => {
    //Health check

    it('should returns 200 on health check', async () => {
      await request(app).get('/api/v1/users/health-check').expect(200);
    });

    // User create test

    it('should return 201 on user created ', async () => {
      return request(app)
        .post(URI)
        .send({
          firstName: 'adeel nasir',
          email: 'adhhshsh@gmail.com',
          password: 'qwieoW3#sod@lkdD',
          confirmPassword: 'qwieoW3#sod@lkdD',
        })
        .expect(201);
    });

    it('should returns 400 with invalid email address', async () => {
      return request(app)
        .post(URI)
        .send({
          firstName: 'adeel nasir',
          email: 'adhhshshgmail.com',
          password: 'qwieoW3#sod@lkdD',
          confirmPassword: 'qwieoW3#sod@lkdD',
        })
        .expect(400);
    });

    it('should returns 400 if the passwords does not fullfill the regex', async () => {
      return request(app)
        .post(URI)
        .send({
          firstName: 'adeel nasir',
          email: 'adhhshshgmail.com',
          password: 'kdsdjksdjksjd',
          confirmPassword: 'kdsdjksdjksjd',
        })
        .expect(400);
    });

    it('should return 400 if password does not matches', async () => {
      return request(app)
        .post(URI)
        .send({
          firstName: 'adeel nasir',
          email: 'adhhshshgmail.com',
          password: 'qwieoW3#sod@lkdD',
          confirmPassword: 'qwieoW3#sod@lkd',
        })
        .expect(400);
    });

    it('should return 400 if the account is already exits with the given eamil', async () => {
      await request(app).post(URI).send({
        firstName: 'adeel nasir',
        email: 'adhhshshgmail.com',
        password: 'qwieoW3#sod@lkdD',
        confirmPassword: 'qwieoW3#sod@lkd',
      });
      await request(app)
        .post(URI)
        .send({
          firstName: 'adeel nasir',
          email: 'adhhshshgmail.com',
          password: 'qwieoW3#sod@lkdD',
          confirmPassword: 'qwieoW3#sod@lkd',
        })
        .expect(400);
    });
  });
});
