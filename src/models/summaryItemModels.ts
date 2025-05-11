import { z } from "astro:schema";
import { useErrorMessages } from "@/errors";
import { useDisplayNames } from "@/localization/displayNames";
import { useFormDataUtils } from "@/utils/formDataUtils";
import { useRouteUtils } from "@/utils/routeUtils";
import { usePhotoUtils } from "@/utils/photoUtils";
import { ValidationError } from "@/errors";

const errorMessages = useErrorMessages();
const displayNames = useDisplayNames();
const formDataUtils = useFormDataUtils();
const routeUtils = useRouteUtils();
const photoUtils = usePhotoUtils();

declare global {
  type SummaryItemBasicModel = {
    id: number;
    name: string;
    summaryContent: string;
    thumbnailUrl: string;
    get publicDetailRoutePath(): string;
    get protectedDetailRoutePath(): string;
    get protectedUpdateRoutePath(): string;
  };

  type SummaryItemDetailModel = SummaryItemBasicModel & { detailContent: string };

  type SummaryItemUpdateModel = {
    id: number;
    name: string;
    summaryContent: string;
    detailContent: string;
    thumbnailUrl: string | null;
    get protectedDetailRoutePath(): string;
    parseFromForm(formData: FormData): void;
    mapFromResponseDto(responseDto: SummaryItemDetailResponseDto): void;
    toRequestDto(): SummaryItemUpdateRequestDto;
  }
}

const updateSchema = z.object({
  name: z
    .string({ message: errorMessages.invalid(displayNames.name) })
    .min(1, { message: errorMessages.required(displayNames.name) }),
  summaryContent: z
    .string({ message: errorMessages.invalid(displayNames.summary) })
    .min(1, { message: errorMessages.required(displayNames.summary) })
    .max(255, { message: errorMessages.stringMaxOrEqualLength(displayNames.summary, 255) }),
  detailContent: z
    .string({ message: errorMessages.invalid(displayNames.detail) })
    .min(1, { message: errorMessages.required(displayNames.detail) })
    .max(3000, { message: errorMessages.stringMaxOrEqualLength(displayNames.detail, 3000) }),
  thumbnailUrl: z
    .string({ message: errorMessages.invalid(displayNames.thumbnail) })
    .nullable()
    .default(null)
});

function createBasic(responseDto: SummaryItemBasicResponseDto): SummaryItemBasicModel {
  return {
    id: responseDto.id,
    name: responseDto.name,
    summaryContent: responseDto.summaryContent,
    thumbnailUrl: responseDto.thumbnailUrl ?? photoUtils.getDefaultPhotoUrl(),
    get publicDetailRoutePath(): string {
      return routeUtils.getPublicSummaryItemsRoutePath(this.id);
    },
    get protectedDetailRoutePath(): string {
      return routeUtils.getProtectedSummaryItemDetailRoutePath(this.id);
    },
    get protectedUpdateRoutePath(): string {
      return routeUtils.getProtectedSummaryItemUpdateRoutePath(this.id);
    }
  };
}

function createDetail(responseDto: SummaryItemDetailResponseDto): SummaryItemDetailModel {
  return {
    ...createBasic(responseDto),
    detailContent: responseDto.detailContent
  };
}

function createUpdate(): SummaryItemUpdateModel {
  return {
    id: 0,
    name: "",
    summaryContent: "",
    detailContent: "",
    thumbnailUrl: null,
    get protectedDetailRoutePath(): string {
      return routeUtils.getProtectedSummaryItemDetailRoutePath(this.id);
    },
    parseFromForm(formData: FormData): void {
      const formDataAsObject = formDataUtils.formDataToObject(formData);
      try {
        const parsedData = updateSchema.parse(formDataAsObject);
        this.name = parsedData.name;
        this.summaryContent = parsedData.summaryContent;
        this.detailContent = parsedData.detailContent;
        this.thumbnailUrl = parsedData.thumbnailUrl;
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new ValidationError(error);
        }

        throw error;
      }
    },
    mapFromResponseDto(responseDto: SummaryItemDetailResponseDto): void {
      this.id = responseDto.id;
      this.name = responseDto.name;
      this.summaryContent = responseDto.summaryContent;
      this.detailContent = responseDto.detailContent;
      this.thumbnailUrl = responseDto.thumbnailUrl;
    },
    toRequestDto(): SummaryItemUpdateRequestDto {
      return {
        name: this.name,
        summaryContent: this.summaryContent,
        detailContent: this.detailContent,
        thumbnailUrl: this.thumbnailUrl
      };
    }
  }
}

export {
  createBasic as createSummaryItemBasicModel,
  createDetail as createSummaryItemDetailModel,
  createUpdate as createSummaryItemUpdateModel
}