import { BaseError } from './base.error';
import { HttpStatusCodes } from './statusCodes';

export class BadRequestError extends BaseError {
  statusCode = HttpStatusCodes.BAD_REQUEST;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeError() {
    return [
      {
        message: this.message,
        success: false,
        isOperational: true,
      },
    ];
  }
}
