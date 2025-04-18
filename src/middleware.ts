import { defineMiddleware } from "astro:middleware";
import { generateAsync } from "../database/dataInitializer";
import { createModelErrorMessagesStore } from "./utils/modelErrorUtils";

export const onRequest = defineMiddleware(async (context, next) => {
  await generateAsync();
  context.locals.modelErrorMessagesStore = createModelErrorMessagesStore();
  return next();
});