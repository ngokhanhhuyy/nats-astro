import { defineMiddleware } from "astro:middleware";
import { PrismaClient } from "@prisma/client";
import { useAboutUsIntroductionService } from "./services/aboutUsIntroductionService";
import { useAuthenticationService } from "./services/authenticationService";
import { useCatalogItemService } from "./services/catalogItemService";
import { useCertificateService } from "./services/certificateService";
import { useContactService } from "./services/contactService";
import { useGeneralSettingsService } from "./services/generalSettingsService";
import { useMemberService } from "./services/memberService";
import { useSliderItemService } from "./services/sliderItemService";
import { useSummaryItemService } from "./services/summaryItemService";
import { useUserService } from "./services/userService";
import { createUserDetailModel } from "@/models/userModels";
import { createGeneralSettingsDetailModel } from "@/models/generalSettingsModels";
import { createContactDetailModel } from "./models/contactModels";
import { createModelErrorMessagesStore } from "./utils/modelErrorUtils";
import { useRouteUtils } from "./utils/routeUtils";

const routeUtils = useRouteUtils();

export const onRequest = defineMiddleware(async (context, next) => {
  // Services.
  const prisma = new PrismaClient();
  try {
    context.locals.services = {
      aboutUsIntroductionService: useAboutUsIntroductionService(prisma),
      authenticationService: useAuthenticationService(prisma),
      catalogItemService: useCatalogItemService(prisma),
      certificateService: useCertificateService(prisma),
      contactService: useContactService(prisma),
      generalSettingsService: useGeneralSettingsService(prisma),
      memberService: useMemberService(prisma),
      sliderItemService: useSliderItemService(prisma),
      summaryItemService: useSummaryItemService(prisma),
      userService: useUserService(prisma)
    }

    context.locals.modelErrorMessagesStore = createModelErrorMessagesStore();
    context.locals.caller = null;
    context.locals.generalSettings = createGeneralSettingsDetailModel(
      await context.locals.services.generalSettingsService.getAsync());
    context.locals.contacts = (await context.locals.services.contactService.getListAsync())
      .map(createContactDetailModel);

    

    // Verify jwt token.
    const token = context.cookies.get("Authorization");
    if (token) {
      try {
        const userResponseDto = context.locals.services.authenticationService
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
  } finally {
    prisma.$disconnect();
  }
});