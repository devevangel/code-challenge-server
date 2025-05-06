/**
 * Constructor for AppError class.
 *
 * @param {string} message - Error message.
 * @param {number} statusCode - HTTP status code.
 */
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Constructor for BadRequestError class.
 *
 * @param {string} [message="Bad Request"] - Error message.
 */
export class BadRequestError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

/**
 * Constructor for NotFoundError class.
 *
 * @param {string} [message="Not Found"] - Error message.
 */
export class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}
