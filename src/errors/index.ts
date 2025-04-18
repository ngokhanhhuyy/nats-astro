export type ModelErrorMessages = Record<string, string>;

class IncludingMessagesError extends Error {
  public readonly errorMessages: ModelErrorMessages;

  constructor(modelErrorMessages: ModelErrorMessages) {
    super();
    this.errorMessages = modelErrorMessages;
  }
}

// Exceptions representing request error
export class ValidationError extends IncludingMessagesError {
}

export class DuplicatedError extends IncludingMessagesError {
}

export class OperationError extends IncludingMessagesError {
}

export class BadRequestError extends IncludingMessagesError {
}

export class AuthenticationError extends Error {
}

export class AuthorizationError extends Error {
}

export class NotFoundError extends Error {
}

export class ConcurrencyError extends Error {
}

export class InternalServerError extends Error {
}

export class UndefinedError extends Error {
}

export class ConnectionError extends Error {
}

export class FileTooLargeError extends Error {
}