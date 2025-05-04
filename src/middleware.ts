import { defineMiddleware } from "astro:middleware";
import { getGeneralSettingsAsync } from "./services/generalSettingsService";
import { createUserDetailModel } from "@/models/userModels";
import { createGeneralSettingsDetailModel } from "@/models/generalSettingsModels";
import { createModelErrorMessagesStore } from "./utils/modelErrorUtils";
import { verifyToken } from "./utils/jwtUtils";
import { getSignInRoutePath, getProtectedRoutePath } from "./utils/routeUtils";

export const onRequest = defineMiddleware(async (context, next) => {
  // await generateAsync();
  context.locals.modelErrorMessagesStore = createModelErrorMessagesStore();
  context.locals.caller = null;
  context.locals.generalSettings = createGeneralSettingsDetailModel(
    await getGeneralSettingsAsync());

  // Verify jwt token.
  const token = context.cookies.get("Authorization");
  if (token) {
    const payload = verifyToken(token.json());
    context.locals.caller = createUserDetailModel(payload.user);
  }

  // Authorize admin route.
  if (context.url.pathname.startsWith(getProtectedRoutePath()) && !context.locals.caller) {
    return context.redirect(getSignInRoutePath());
  }

  return next();
});