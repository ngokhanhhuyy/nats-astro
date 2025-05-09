/// <reference types="astro/types" />

declare namespace App {
  interface Locals {
    modelErrorMessagesStore: import("@/utils/modelErrorUtils").IModelErrorMessagesStore;
    caller: UserDetailModel | null;
    generalSettings: GeneralSettingsDetailModel;
    contacts: ContactDetailModel[];
  }
}
