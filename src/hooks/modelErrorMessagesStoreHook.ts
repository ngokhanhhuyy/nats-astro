import React, { useState, createContext } from "react";
import type { ModelErrorMessages } from "@/errors";

const ModelErrorMessagesStoreContext = createContext<IModelErrorMessagesStore | null>(null);

/**
 * Inspired by ModelStateDictionary class and ModelState property in ASP.NET Core MVC, this
 * interface/class is to store and display error messages for each property in a model.
 */
export interface IModelErrorMessagesStore {
  /**
   * Get the object containing the properties of the model those have errors and their
   * errors.
   */
  readonly errors: ModelErrorMessages;

  /**
   * Get the valid state of the model state, the result will be always true if the model
   * hasn't been validated yet. Otherwise, if the model has any error, the result will be
   * false.
   */
  readonly isValid: boolean;

  /**
   * Check if the model has been validated. The result will be true after the model state has
   * been set some errors and before being reset errors.
   */
  readonly isValidated: boolean;

  /**
   * Check if the model has been validated and the property has any error.
   *
   * @param propertyPath The path of the property in the model.
   * @returns If the model hasn't been validated, the result will be always false.
   * Otherwise, the result will be true if the property has any error.
   */
  readonly hasError: (propertyPath: string) => boolean;

  /**
   *
   * @param propertyPath The path of the property in the model.
   * @returns If the property has any errors, the result will be the first error message.
   */
  readonly getError: (propertyPath: string) => string | null;

  /**
   * Get the text for the message element of a property with given path.
   *
   * @param propertyPath
   * @returns The text will be "Hợp lệ" if the property doesn't have any error.
   * Otherwise, the text will be the first error message of the property.
   */
  readonly getMessage: (propertyPath: string) => string;

  /**
   * Set new errors and set the validation state into validated state.
   * @param errorMessages An object contaning errors for properties.
   */
  readonly setErrorMessages: (errorMessages: ModelErrorMessages) => void;

  /**
   * Clear the current errors.
   */
  readonly clearErrorMessages: () => void;

  /**
   * Clear the current errors and set validation state to initial state.
   */
  readonly resetErrorMessages: () => void;

  /**
   * Get all error messages of all properties.
   * @returns An array containing all error messages, regardless property name.
   */
  readonly getAllErrorMessages: () => string[];

  /**
   * Check if the model state has been validated and contains any error.
   * @returns True if there is any error, otherwise, false.
   */
  readonly hasAnyError: () => boolean;

  /**
   * Get Bootstrap class name for the input element based on the validation state of the
   * property with given path.
   *
   * @param propertyPath The path of the property in the model.
   * @returns Bootstrap class-name for the input element.
   */
  readonly getInputClassName: (propertyPath: string) => string | null;

  /**
   * Get Bootstrap class name for message element based on the
   * validation state of the property with given path.
   *
   * @param propertyPath The path of the property in the model.
   * @returns Bootstrap class-name for the message element.
   */
  readonly getMessageClassName: (propertyPath: string) => string | null;
}

function useModelErrorMessagesStore(): IModelErrorMessagesStore {
  const [errorMessages, _setErrorMessages] = useState<ModelErrorMessages>({ });
  const [isValidated, setIsValidated] = useState<boolean>(() => false);

  return {
    get errors(): ModelErrorMessages {
      return errorMessages;
    },

    get isValid(): boolean {
      return (
        errorMessages == null || Object.keys(errorMessages).length === 0
      );
    },

    get isValidated(): boolean {
      return isValidated;
    },

    hasError(propertyPath: string): boolean {
      if (!isValidated) {
        return false;
      }

      try {
        return errorMessages[propertyPath as keyof typeof errorMessages][0] != null;
      } catch {
        return false;
      }
    },

    getError(propertyPath: string): string | null {
      if (!isValidated) {
        return null;
      }

      try {
        return errorMessages[propertyPath][0] || null;
      } catch {
        return null;
      }
    },

    clearErrorMessages(): void {
      _setErrorMessages({ });
    },

    resetErrorMessages(): void {
      this.clearErrorMessages();
      setIsValidated(false);
    },

    getMessage(propertyPath: string): string {
      return this.getError(propertyPath) || "Hợp lệ.";
    },

    setErrorMessages(errors: ModelErrorMessages): void {
      _setErrorMessages(errors);
      setIsValidated(true);
    },

    getAllErrorMessages(): string[] {
      const messages: string[] = [];

      if (!errorMessages) {
        return messages;
      }

      for (const propertyErrors of Object.values(errorMessages)) {
        for (const message of propertyErrors) {
          messages.push(message);
        }
      }

      return messages;
    },

    hasAnyError(): boolean {
      return errorMessages != null && Object.keys(errorMessages).length > 0;
    },

    getInputClassName(propertyPath: string): string | null {
      if (isValidated) {
        return this.hasError(propertyPath) ? "is-invalid" : "is-valid";
      }
      return null;
    },

    getMessageClassName(propertyPath: string): string | null {
      if (isValidated) {
        return this.hasError(propertyPath) ? "text-danger" : "text-success";
      }
      return null;
    },
  };
}

export { ModelErrorMessagesStoreContext, useModelErrorMessagesStore };