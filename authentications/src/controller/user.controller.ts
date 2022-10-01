import { Response, Request } from 'express';
import { get } from 'lodash';
import { signupUser } from '../services/user.service';
import { log } from '../utils/logger';
import { omit } from 'lodash';

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await signupUser(req.body);

    if (!user) {
      return res.status(409).json({
        errors: 'Email already exits',
      });
    }

    res.status(201).json({
      success: true,
      user: omit(user.toJSON(), 'password', 'confirmPassword'),
    });
  } catch (err: any) {
    //hanlde errors
    log.error(err);
    throw new Error(err);
  }
};
