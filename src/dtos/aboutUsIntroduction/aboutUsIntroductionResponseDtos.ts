import { ThumbnailType } from "@/enums/thumbnailType";
import type { AboutUsIntroduction } from "@prisma/client";

declare global {
  type AboutUsIntroductionResponseDto = {
    thumbnailUrl: string | null,
    thumbnailType: ThumbnailType,
    mainQuoteContent: string | null,
    aboutUsContent: string,
    whyChooseUsContent: string,
    ourDifferenceContent: string,
    ourCultureContent: string,
  }
}

function create(aboutUsIntroduction: AboutUsIntroduction): AboutUsIntroductionResponseDto {
  return {
    thumbnailUrl: aboutUsIntroduction.thumbnailUrl,
    thumbnailType: ThumbnailType[aboutUsIntroduction.thumbnailType],
    mainQuoteContent: aboutUsIntroduction.mainQuoteContent,
    aboutUsContent: aboutUsIntroduction.aboutUsContent,
    whyChooseUsContent: aboutUsIntroduction.whyChooseUsContent,
    ourDifferenceContent: aboutUsIntroduction.ourDifferenceContent,
    ourCultureContent: aboutUsIntroduction.ourCultureContent
  };
}

export { create as createAboutUsIntroductionResponseDto };