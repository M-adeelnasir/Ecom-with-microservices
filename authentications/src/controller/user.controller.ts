import { Response, Request } from 'express';
import { get } from 'lodash';
import { log } from '../utils/logger';

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    res.send(req.body);
  } catch (err: any) {
    //hanlde errors
    log.error(err);
    throw new Error(err);
  }
};
