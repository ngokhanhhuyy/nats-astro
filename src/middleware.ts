import { defineMiddleware } from "astro:middleware";
import { generateAsync } from "../database/dataInitializer";

export const onRequest = defineMiddleware(async (context, next) => {
  await generateAsync();
  return next();
});