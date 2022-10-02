import { Response, Request } from 'express';
import { signupUser } from '../services/user.service';

export const createUserHandler = async (req: Request, res: Response) => {
  const user = await signupUser(req.body);
  res.status(201).json({
    success: true,
    user,
  });
};
