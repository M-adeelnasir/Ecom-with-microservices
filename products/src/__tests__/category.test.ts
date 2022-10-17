import { app } from '../utils/app';
import request from 'supertest';
const PRODUCT_SERVICE_URI = 'http://shopproduct.dev';

const SIGNIN_URI = '/api/v1/users/signin';
const CATEGORY_URI = '/api/v1/products/category';
const SIGNUP_URI = '/api/v1/users/signup';

describe('Category', () => {
  describe('category manipulation as CRUD opration', () => {
    it('shoud return 201 on health check of product service', async () => {
      await request(app).get('/api/v1/products/health-check').expect(200);
    });

    it('shoud return 201 on  of product service', async () => {
      await request(PRODUCT_SERVICE_URI).post(SIGNUP_URI).send({
        firstName: 'adeel nasir',
        email: 'xpsel@gmail.com',
        password: 'kjfj@SldkfW874!',
        confirmPassword: 'kjfj@SldkfW874!',
        role: 'admin',
      });

      let ACCESS_TOKEN = null;
      const response = await request(PRODUCT_SERVICE_URI)
        .post(SIGNIN_URI)
        .send({
          email: 'xpsel@gmail.com',
          password: 'kjfj@SldkfW874!',
        })
        .expect(201);

      ACCESS_TOKEN = response.body.accessToken;
      console.log(ACCESS_TOKEN);
      const res = await request(app)
        .post(CATEGORY_URI)
        .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
        .send({
          name: 'hel flo',
        })
        .expect(201);
    });
  });
});
