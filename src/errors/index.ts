import { z } from "astro:schema";

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
  constructor(modelErrorMessages: ModelErrorMessages);
  constructor(zodError: z.ZodError);
  constructor(arg: ModelErrorMessages | z.ZodError) {
    if (arg instanceof z.ZodError) {
      const errorMessages: ModelErrorMessages = { };
      for (const issue of arg.issues) {
        console.log(issue);
        const path = issue.path.map((element, index, issues) => {
          const formattedElement = typeof element === "number" ? `[${element}]` : element;
          if (index < issues.length - 1) {
            return formattedElement + ".";
          }

          return formattedElement;
        }).join("");

        errorMessages[path] = issue.message;
      }

      super(errorMessages);
    } else {
      super(arg);
    }
  }
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