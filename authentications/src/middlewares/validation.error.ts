import { CustomError } from './custom.error';
import { ValidationError } from 'yup';

export class ValidationErrors extends CustomError {
  statusCode = 400;
  constructor(public error: ValidationError) {
    super();

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeError() {
    //   @ts-ignore
    return [{ message: error.message, field: error.path }];
  }
}
