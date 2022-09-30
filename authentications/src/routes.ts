import { Response, Request, Express } from 'express';

export default function (app: Express) {
  app.get('/health-check', (req: Request, res: Response) => {
    res.sendStatus(200);
  });
}
