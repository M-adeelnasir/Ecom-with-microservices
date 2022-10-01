export abstract class CustomError extends Error {
  abstract statusCode: Number;
  constructor() {
    super();
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeError(): {
    message: string;
    field?: string;
  }[];
}
