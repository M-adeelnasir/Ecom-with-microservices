import { BaseError } from './base.error';
import { HttpStatusCodes } from './statusCodes';

export class UnAuthorizedError extends BaseError {
  statusCode = HttpStatusCodes.UNAUTHORIZED;

  constructor() {
    super('UnAuthorized');
  }

  serializeError() {
    return [
      {
        message: 'Not Authorized',
        success: false,
        isOperational: true,
      },
    ];
  }
}
