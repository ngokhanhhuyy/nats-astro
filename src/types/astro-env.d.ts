/// <reference types="astro/types" />

declare namespace App {
  interface Locals {
    modelErrorMessagesStore: import("@/utils/modelErrorUtils").IModelErrorMessagesStore;
    isAuthenticated: boolean;
  }
}
