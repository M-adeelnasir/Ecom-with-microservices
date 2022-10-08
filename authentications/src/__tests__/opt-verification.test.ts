import { app } from '../utils/app';
import request from 'supertest';

const SIGNIN_URI = '/api/v1/users/signin';
const SIGNUP_URI = '/api/v1/users/signup';
const EMAIL_SEND_URI = '/api/v1/users/send-email-opt';

describe('Email', () => {
  describe('Email OPT code sending to gmail', () => {
    // todo you can uncomment it in production
    // it('should return 200 on email send for opt verification', async () => {
    //   let ACCESS_TOKEN = null;
    //   await request(app)
    //     .post(SIGNUP_URI)
    //     .send({
    //       firstName: 'adeel nasir',
    //       email: 'adeelnasirkbw@gmail.com',
    //       password: 'kjfj@SldkfW874!',
    //       confirmPassword: 'kjfj@SldkfW874!',
    //     })
    //     .expect(201);

    //   const res = await request(app)
    //     .post(SIGNIN_URI)
    //     .send({
    //       email: 'adeelnasirkbw@gmail.com',
    //       password: 'kjfj@SldkfW874!',
    //     })
    //     .expect(201);

    //   ACCESS_TOKEN = res.body.accessToken;
    //   await request(app)
    //     .post(EMAIL_SEND_URI)
    //     .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
    //     .expect(200);
    // });
    it('should return 400 on if jwt token is not provided', async () => {
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
        .expect(201);
      await request(app).post(EMAIL_SEND_URI).expect(400);
    });
  });
});
