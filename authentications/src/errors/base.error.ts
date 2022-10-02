export abstract class BaseError extends Error {
  abstract statusCode: number;

  constructor() {
    super();

    Object.setPrototypeOf(this, new.target.prototype);
  }

  abstract serializeError(): {
    message: string;
    success: boolean;
    isOperational: boolean;
    path?: string;
  }[];
}
