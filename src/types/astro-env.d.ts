/// <reference types="astro/types" />

import type { AboutUsIntroductionService } from "@/services/aboutUsIntroductionService";
import type { AuthenticationService } from "@/services/authenticationService";
import type { CatalogItemService } from "@/services/catalogItemService";
import type { CertificateService } from "@/services/certificateService";
import type { ContactService } from "@/services/contactService";
import type { GeneralSettingsService } from "@/services/generalSettingsService";
import type { MemberService } from "@/services/memberService";
import type { SliderItemService } from "@/services/sliderItemService";
import type { SummaryItemService } from "@/services/summaryItemService";
import type { UserService } from "@/services/userService";

declare namespace App {
  interface Locals {
    modelErrorMessagesStore: import("@/utils/modelErrorUtils").IModelErrorMessagesStore;
    caller: UserDetailModel | null;
    generalSettings: GeneralSettingsDetailModel;
    contacts: ContactDetailModel[];
    services: {
      aboutUsIntroductionService: import("@/services/aboutUsIntroductionService")
        .AboutUsIntroductionService,
      authenticationService: AuthenticationService;
      catalogItemService: CatalogItemService,
      certificateService: CertificateService,
      contactService: ContactService,
      generalSetttingsService: GeneralSettingsService,
      memberService: MemberService,
      sliderItemService: SliderItemService,
      summaryItemService: SummaryItemService,
      userService: UserService
    }
  }
}
