import { Response, Request, Express } from 'express';

export default function (app: Express) {
  app.get('/api/v1/users/health-check', (req: Request, res: Response) => {
    res.sendStatus(200);
  });
}
