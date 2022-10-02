import { HttpStatusCodes } from './statusCodes';
import { BaseError } from './base.error';

export class NotFoundError extends BaseError {
  statusCode = HttpStatusCodes.NOT_FOUND;
  constructor() {
    super('Not Found Error');
  }
  serializeError() {
    return [
      {
        message: 'Not Found try with right credentials',
        success: false,
        isOperational: true,
      },
    ];
  }
}
