/// <reference types="astro/types" />

declare namespace App {
  interface Locals {
    modelErrorMessagesStore: import("@/utils/modelErrorUtils").IModelErrorMessagesStore;
    caller: UserDetailModel | null;
    generalSettings: GeneralSettingsDetailModel;
    contacts: ContactDetailModel[];
    services: {
      aboutUsIntroductionService: import("@/services/aboutUsIntroductionService").AboutUsIntroductionService;
      authenticationService: import("@/services/authenticationService").AuthenticationService;
      catalogItemService: import("@/services/catalogItemService").CatalogItemService;
      certificateService: import("@/services/certificateService").CertificateService;
      contactService: import("@/services/contactService").ContactService;
      generalSettingsService: import("@/services/generalSettingsService").GeneralSettingsService;
      memberService: import("@/services/memberService").MemberService,
      sliderItemService: import("@/services/sliderItemService").SliderItemService,
      summaryItemService: import("@/services/summaryItemService").SummaryItemService,
      userService: import("@/services/userService").UserService
    }
  }
}
