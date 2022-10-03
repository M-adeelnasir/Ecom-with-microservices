import { Response, Request } from 'express';
import { get } from 'lodash';
import {log} from '../utils/logger'


export const exmapleHandler = async (req: Request, res: Response) => {
try {
//handle logic

} catch (err: any) {
//hanlde errors
log.error(err)
throw new Error(err)
}

}