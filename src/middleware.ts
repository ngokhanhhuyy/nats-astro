import { defineMiddleware } from "astro:middleware";
import { useAuthenticationService } from "./services/authenticationService";
import { useGeneralSettingsService } from "./services/generalSettingsService";
import { useContactService } from "./services/contactService";
import { createUserDetailModel } from "@/models/userModels";
import { createGeneralSettingsDetailModel } from "@/models/generalSettingsModels";
import { createContactDetailModel } from "./models/contactModels";
import { createModelErrorMessagesStore } from "./utils/modelErrorUtils";
import { useRouteUtils } from "./utils/routeUtils";

const authenticationService = useAuthenticationService();
const generalSettingsService = useGeneralSettingsService();
const contactService = useContactService();
const routeUtils = useRouteUtils();

export const onRequest = defineMiddleware(async (context, next) => {
  context.locals.modelErrorMessagesStore = createModelErrorMessagesStore();
  context.locals.caller = null;
  context.locals.generalSettings = createGeneralSettingsDetailModel(
    await generalSettingsService.getAsync());
  context.locals.contacts = (await contactService.getListAsync())
    .map(createContactDetailModel);

  

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