import { ThumbnailType } from "@/enums/thumbnailType";
import { z } from "astro:schema";
import { useErrorMessages } from "@/errors/errorMessages";
import { useDisplayNames } from "@/localization/displayNames";
import { useFormDataUtils } from "@/utils/formDataUtils";
import { useRouteUtils } from "@/utils/routeUtils";
import { ValidationError } from "@/errors";

const errorMessageGenerator = useErrorMessages();
const displayNames = useDisplayNames();
const formDataUtils = useFormDataUtils();
const routeUtils = useRouteUtils();

declare global {
  type AboutUsIntroductionDetailModel = {
    thumbnailUrl: string | null;
    thumbnailType: ThumbnailType;
    mainQuoteContent: string | null;
    aboutUsContent: string;
    whyChooseUsContent: string;
    ourDifferenceContent: string;
    ourCultureContent: string;
    updateRoutePath: string;
  }

  type AboutUsIntroductionUpdateModel = {
    thumbnailUrl: string;
    thumbnailType: ThumbnailType;
    mainQuoteContent: string;
    aboutUsContent: string;
    whyChooseUsContent: string;
    ourDifferenceContent: string;
    ourCultureContent: string;
    detailRoutePath: string;
    parseFromForm(formData: FormData): void;
    toRequestDto(): AboutUsIntroductionUpdateRequestDto;
  }
}

const parser = z.object({
  thumbnailUrl: z.string()
    .max(1000, {
      message: errorMessageGenerator.stringMaxOrEqualLength(displayNames.thumbnail, 1000)
    }),
  thumbnailType: z.nativeEnum(ThumbnailType),
  mainQuoteContent: z.string()
    .max(1000, {
      message: errorMessageGenerator.stringMaxOrEqualLength(displayNames.mainQuote, 1000)
    }),
  aboutUsContent: z.string()
    .max(1000, {
      message: errorMessageGenerator.stringMaxOrEqualLength(displayNames.aboutUs, 1000)
    }),
  whyChooseUsContent: z.string()
    .max(1000, {
      message: errorMessageGenerator.stringMaxOrEqualLength(displayNames.whyChooseUs, 1000)
    }),
  ourDifferenceContent: z.string()
    .max(1000, {
      message: errorMessageGenerator.stringMaxOrEqualLength(displayNames.ourDifference, 1000)
    }),
  ourCultureContent: z.string()
    .max(1000, {
      message: errorMessageGenerator.stringMaxOrEqualLength(displayNames.ourCulture, 1000)
    }),
});

type ResponseDto = AboutUsIntroductionResponseDto;

function createDetail(responseDto: ResponseDto): AboutUsIntroductionDetailModel {
  return {
    thumbnailUrl: responseDto.thumbnailUrl,
    thumbnailType: responseDto.thumbnailType,
    mainQuoteContent: responseDto.mainQuoteContent,
    aboutUsContent: responseDto.aboutUsContent,
    whyChooseUsContent: responseDto.whyChooseUsContent,
    ourDifferenceContent: responseDto.ourDifferenceContent,
    ourCultureContent: responseDto.ourCultureContent,
    get updateRoutePath(): string {
      return routeUtils.getProtectedAboutUsIntroductionUpdateRoutePath();
    }
  };
}

function createUpdate(responseDto?: ResponseDto): AboutUsIntroductionUpdateModel {
  const model = {
    thumbnailUrl: "",
    thumbnailType: ThumbnailType.Photo,
    mainQuoteContent: "",
    aboutUsContent: "",
    whyChooseUsContent: "",
    ourDifferenceContent: "",
    ourCultureContent: "",
    get detailRoutePath(): string {
      return routeUtils.getProtectedAboutUsIntroductionDetailRoutePath();
    }
  };

  if (responseDto) {
    model.thumbnailUrl = responseDto.thumbnailUrl ?? "";
    model.thumbnailType = responseDto.thumbnailType;
    model.mainQuoteContent = responseDto.mainQuoteContent ?? "";
    model.aboutUsContent = responseDto.aboutUsContent;
    model.whyChooseUsContent = responseDto.whyChooseUsContent;
    model.ourDifferenceContent = responseDto.ourDifferenceContent;
    model.ourCultureContent = responseDto.ourCultureContent;
  }

  return {
    ...model,
    parseFromForm(formData) {
      const formDataAsObject = formDataUtils.formDataToObject(formData);
      try {
        const parsedData = parser.parse(formDataAsObject);
        this.thumbnailUrl = parsedData.thumbnailUrl;
        this.thumbnailType = parsedData.thumbnailType;
        this.mainQuoteContent = parsedData.mainQuoteContent;
        this.aboutUsContent = parsedData.aboutUsContent;
        this.whyChooseUsContent = parsedData.whyChooseUsContent;
        this.ourDifferenceContent = parsedData.ourDifferenceContent;
        this.ourCultureContent = parsedData.ourCultureContent;
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new ValidationError(error);
        }

        throw error;
      }
    },
    toRequestDto() {
      return {
        thumbnailUrl: this.thumbnailUrl || null,
        thumbnailType: this.thumbnailType,
        mainQuoteContent: this.mainQuoteContent,
        aboutUsContent: this.aboutUsContent,
        whyChooseUsContent: this.whyChooseUsContent,
        ourDifferenceContent: this.ourDifferenceContent,
        ourCultureContent: this.ourCultureContent
      };
    }
  };
}

export {
  createDetail as createAboutUsIntroductionDetailModel,
  createUpdate as createAboutUsIntroductionUpdateModel
};