import { app } from '../utils/app';
import request from 'supertest';

const SIGNIN_URI = '/api/v1/users/signin';
const SIGNUP_URI = '/api/v1/users/signup';

describe('User', () => {
  describe('User login Session', () => {
    it('should return 201 on create success full creating session', async () => {
      request(app).post(SIGNUP_URI).send({
        firstName: 'adeel nasir',
        email: 'exampl@gmail.com',
        password: 'kjfj@SldkfW874!',
        confirmPassword: 'kjfj@SldkfW874!',
      });

      request(app)
        .post(SIGNIN_URI)
        .send({
          email: 'exampl@gmail.com',
          password: 'kjfj@SldkfW874!',
        })
        .expect(201);
    });
    it('should return 400 if provided email is invalid', async () => {
      await request(app).post(SIGNUP_URI).send({
        firstName: 'adeel nasir',
        email: 'exampl@gmail.com',
        password: 'kjfj@SldkfW874!',
        confirmPassword: 'kjfj@SldkfW874!',
      });

      await request(app)
        .post(SIGNIN_URI)
        .send({
          email: 'exampsl@gmail.com',
          password: 'kjfj@SldkfW874!',
        })
        .expect(400);
    });

    it('should return 400 if provided password is incorrect', async () => {
      await request(app).post(SIGNUP_URI).send({
        firstName: 'adeel nasir',
        email: 'exampl@gmail.com',
        password: 'kjfj@SldkfW874!',
        confirmPassword: 'kjfj@SldkfW874!',
      });

      await request(app)
        .post(SIGNIN_URI)
        .send({
          email: 'exampsl@gmail.com',
          password: 'kjfj@SldkfW874',
        })
        .expect(400);
    });
    it('should returns 400 if account doest not exits', async () => {
      await request(app)
        .post(SIGNIN_URI)
        .send({
          email: 'exampsl@gmail.com',
          password: 'kjfj@SldkfW874',
        })
        .expect(400);
    });
    it('should return access token', async () => {
      await request(app)
        .post(SIGNUP_URI)
        .send({
          firstName: 'adeel nasir',
          email: 'exampl@gmail.com',
          password: 'kjfj@SldkfW874!',
          confirmPassword: 'kjfj@SldkfW874!',
        })
        .expect(201);
      const res = await request(app)
        .post(SIGNIN_URI)
        .send({
          email: 'exampl@gmail.com',
          password: 'kjfj@SldkfW874!',
        })
        .expect(201)
        .then((res) => {
          expect(res.body).toHaveProperty('accessToken');
        });
    });
    it('should return refresh token', async () => {
      await request(app)
        .post(SIGNUP_URI)
        .send({
          firstName: 'adeel nasir',
          email: 'exampl@gmail.com',
          password: 'kjfj@SldkfW874!',
          confirmPassword: 'kjfj@SldkfW874!',
        })
        .expect(201);
      await request(app)
        .post(SIGNIN_URI)
        .send({
          email: 'exampl@gmail.com',
          password: 'kjfj@SldkfW874!',
        })
        .expect(201)
        .then((res) => {
          expect(res.body).toHaveProperty('refreshToken');
        });
    });
  });
});