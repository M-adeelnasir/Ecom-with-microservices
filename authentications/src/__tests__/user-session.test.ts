import { app } from '../utils/app';
import request from 'supertest';

const SIGNIN_URI = '/api/v1/users/signin';
const SIGNUP_URI = '/api/v1/users/signup';
const USER_SESSION = '/api/v1/users/sessions';
const USER_LOGOUT = '/api/v1/users/logout';

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

    it('should return 200 on getting all login sessions currently online', async () => {
      let ACCESS_TOKEN = null;
      await request(app)
        .post(SIGNUP_URI)
        .send({
          firstName: 'adeel nasir',
          email: 'exampl@gmail.com',
          password: 'kjfj@SldkfW874!',
          confirmPassword: 'kjfj@SldkfW874!',
        })
        .expect(201);
      const res = await request(app).post(SIGNIN_URI).send({
        email: 'exampl@gmail.com',
        password: 'kjfj@SldkfW874!',
      });

      ACCESS_TOKEN = res.body.accessToken;

      const userId = res.body.session.user;
      await request(app)
        .post(USER_SESSION)
        .send({
          userId,
        })
        .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
        .expect(200);
    });
    it('should return 204 on deleteing a login session', async () => {
      let ACCESS_TOKEN = null;
      await request(app)
        .post(SIGNUP_URI)
        .send({
          firstName: 'adeel nasir',
          email: 'exampl@gmail.com',
          password: 'kjfj@SldkfW874!',
          confirmPassword: 'kjfj@SldkfW874!',
        })
        .expect(201);
      const res = await request(app).post(SIGNIN_URI).send({
        email: 'exampl@gmail.com',
        password: 'kjfj@SldkfW874!',
      });
      ACCESS_TOKEN = res.body.accessToken;
      const sessionId = res.body.session._id;
      await request(app)
        .delete(USER_SESSION)
        .send({
          sessionId,
        })
        .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
        .expect(204);
    });

    it('should return 401 if user is not signing In', async () => {
      await request(app)
        .post(SIGNUP_URI)
        .send({
          firstName: 'adeel nasir',
          email: 'exampl@gmail.com',
          password: 'kjfj@SldkfW874!',
          confirmPassword: 'kjfj@SldkfW874!',
        })
        .expect(201);
      const res = await request(app).post(SIGNIN_URI).send({
        email: 'exampl@gmail.com',
        password: 'kjfj@SldkfW874!',
      });
      const userId = res.body.session.user;

      await request(app)
        .post(USER_SESSION)
        .send({
          userId,
        })
        .expect(401);
    });
    it('should return 200 for the current User', async () => {
      let ACCESS_TOKEN = null;

      await request(app)
        .post(SIGNUP_URI)
        .send({
          firstName: 'adeel nasir',
          email: 'exampl@gmail.com',
          password: 'kjfj@SldkfW874!',
          confirmPassword: 'kjfj@SldkfW874!',
        })
        .expect(201);
      const res = await request(app).post(SIGNIN_URI).send({
        email: 'exampl@gmail.com',
        password: 'kjfj@SldkfW874!',
      });
      ACCESS_TOKEN = res.body.accessToken;

      const userId = res.body.session.user;
      await request(app)
        .post(USER_SESSION)
        .send({
          userId,
        })
        .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
        .expect(200);
    });
    it('should return 204 if the user logouts', async () => {
      let ACCESS_TOKEN = null;

      await request(app)
        .post(SIGNUP_URI)
        .send({
          firstName: 'adeel nasir',
          email: 'exampl@gmail.com',
          password: 'kjfj@SldkfW874!',
          confirmPassword: 'kjfj@SldkfW874!',
        })
        .expect(201);
      const res = await request(app).post(SIGNIN_URI).send({
        email: 'exampl@gmail.com',
        password: 'kjfj@SldkfW874!',
      });
      ACCESS_TOKEN = res.body.accessToken;

      await request(app)
        .delete(USER_LOGOUT)
        .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
        .expect(204);
    });
    it('should return true if accessToken is removed on logout', async () => {
      let ACCESS_TOKEN = null;

      await request(app)
        .post(SIGNUP_URI)
        .send({
          firstName: 'adeel nasir',
          email: 'exampl@gmail.com',
          password: 'kjfj@SldkfW874!',
          confirmPassword: 'kjfj@SldkfW874!',
        })
        .expect(201);
      const res = await request(app).post(SIGNIN_URI).send({
        email: 'exampl@gmail.com',
        password: 'kjfj@SldkfW874!',
      });
      ACCESS_TOKEN = res.body.accessToken;

      const result = await request(app)
        .delete(USER_LOGOUT)
        .set('Authorization', `Bearer ${ACCESS_TOKEN}`);
      const accessToken = result.headers.accesstoken;
      expect(accessToken).toEqual('');
    });
  });
});
