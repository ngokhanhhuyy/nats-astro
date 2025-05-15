import { z } from "astro:schema";
import { useErrorMessages } from "@/errors";
import { useDisplayNames } from "@/localization/displayNames";
import { useFormDataUtils } from "@/utils/formDataUtils";
import { useRouteUtils } from "@/utils/routeUtils";
import { ValidationError } from "@/errors";

const errorMessages = useErrorMessages();
const displayNames = useDisplayNames();
const formDataUtils = useFormDataUtils();
const routeUtils = useRouteUtils();

declare global {
  type SliderItemDetailModel = {
    id: number;
    title: string | null;
    thumbnailUrl: string;
    protectedUpdateRoutePath: string;
  };

  type SliderItemUpsertModel = {
    title: string;
    thumbnailUrl: string;
    parseFromForm(formData: FormData): void;
    mapFromResponseDto(responseDto: SliderItemResponseDto): void;
    toRequestDto(): SliderItemUpsertRequestDto;
  };
}

const schema = z.object({
  title: z
    .string({ message: errorMessages.invalid(displayNames.title) })
    .default(""),
  thumbnailUrl: z
    .string({ message: errorMessages.invalid(displayNames.photo) })
    .min(1, { message: errorMessages.required(displayNames.photo) })
});

function createDetail(responseDto: SliderItemResponseDto): SliderItemDetailModel {
  return {
    id: responseDto.id,
    title: responseDto.title,
    thumbnailUrl: responseDto.thumbnailUrl,
    get protectedUpdateRoutePath(): string {
      return routeUtils.getProtectedSliderItemUpdateRoutePath(this.id);
    }
  };
}

function createUpsert(): SliderItemUpsertModel {
  return {
    title: "",
    thumbnailUrl: "",
    parseFromForm(formData: FormData): void {
      const formDataAsObject = formDataUtils.formDataToObject(formData);
      try {
        const parsedData = schema.parse(formDataAsObject);
        this.title = parsedData.title ?? "";
        this.thumbnailUrl = parsedData.thumbnailUrl;
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new ValidationError(error);
        } else {
          throw error;
        }
      }
    },
    mapFromResponseDto(responseDto: SliderItemResponseDto): void {
      this.title = responseDto.title ?? "";
      this.thumbnailUrl = responseDto.thumbnailUrl;
    },
    toRequestDto(): SliderItemUpsertRequestDto {
      return {
        title: this.title || null,
        thumbnailUrl: this.thumbnailUrl
      };
    }
  };
}

export {
  createDetail as createSliderItemDetailModel,
  createUpsert as createSliderItemUpsertModel
};