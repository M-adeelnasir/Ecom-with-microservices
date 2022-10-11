export abstract class BaseError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
  }

  abstract serializeError(): {
    message: string;
    success: boolean;
    isOperational: boolean;
    path?: string;
  }[];
}
