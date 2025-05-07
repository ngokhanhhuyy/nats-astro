import { defineMiddleware } from "astro:middleware";
import { getGeneralSettingsAsync } from "./services/generalSettingsService";
import { createUserDetailModel } from "@/models/userModels";
import { createGeneralSettingsDetailModel } from "@/models/generalSettingsModels";
import { createModelErrorMessagesStore } from "./utils/modelErrorUtils";
import { verifyToken } from "./utils/jwtUtils";
import { useRouteUtils } from "./utils/routeUtils";

const routeUtils = useRouteUtils();

export const onRequest = defineMiddleware(async (context, next) => {
  // await generateAsync();
  context.locals.modelErrorMessagesStore = createModelErrorMessagesStore();
  context.locals.caller = null;
  context.locals.generalSettings = createGeneralSettingsDetailModel(
    await getGeneralSettingsAsync());

  // Verify jwt token.
  const token = context.cookies.get("Authorization");
  if (token) {
    try {
      const payload = verifyToken(token.value.replace(/^Bearer\s/, ""));
      context.locals.caller = createUserDetailModel(payload.user);
    } catch (error) {
      context.cookies.delete("Authorization");
    }
  }

  // Authorize admin route.
  const isProtectedRoute = context.url.pathname.startsWith(routeUtils.getProtectedRoutePath());
  if (isProtectedRoute && !context.locals.caller) {
    return context.redirect(routeUtils.getSignInRoutePath());
  }

  return next();
});