import request from 'supertest';
import { app } from '../utils/app';
describe('User', () => {
  describe('create user', () => {
    it('should return 200', async () => {
      await request(app).get('/health-check').expect(200);
    });
  });
});
