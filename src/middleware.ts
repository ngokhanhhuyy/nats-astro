import { defineMiddleware } from "astro:middleware";
import { useAuthenticationService } from "./services/authenticationService";
import { useGeneralSettingsService } from "./services/generalSettingsService";
import { createUserDetailModel } from "@/models/userModels";
import { createGeneralSettingsDetailModel } from "@/models/generalSettingsModels";
import { createModelErrorMessagesStore } from "./utils/modelErrorUtils";
import { useRouteUtils } from "./utils/routeUtils";

const authenticationService = useAuthenticationService();
const generalSettingsService = useGeneralSettingsService();
const routeUtils = useRouteUtils();

export const onRequest = defineMiddleware(async (context, next) => {
  context.locals.modelErrorMessagesStore = createModelErrorMessagesStore();
  context.locals.caller = null;
  context.locals.generalSettings = createGeneralSettingsDetailModel(
    await generalSettingsService.getAsync());

  // Verify jwt token.
  const token = context.cookies.get("Authorization");
  if (token) {
    try {
      const userResponseDto = authenticationService
        .verifyToken(token.value.replace(/^Bearer\s/, ""));
      context.locals.caller = createUserDetailModel(userResponseDto);
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