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
  type MemberDetailModel = {
    id: number;
    fullName: string;
    roleName: string;
    thumbnailUrl: string | null;
    description: string;
    protectedDetailRoutePath: string;
    protectedUpdateRoutePath: string;
  };

  type MemberUpsertModel = {
    id: number;
    fullName: string;
    roleName: string;
    thumbnailUrl: string | null;
    description: string;
    protectedDetailRoutePath: string;
    parseFromForm(formData: FormData): void;
    mapFromResponseDto(responseDto: MemberDetailResponseDto): void;
    toRequestDto(): MemberUpsertRequestDto;
  };
}

const upsertSchema = z.object({
  fullName: z
    .string({ message: errorMessages.invalid(displayNames.fullName) })
    .min(1, { message: errorMessages.required(displayNames.fullName) })
    .max(50, { message: errorMessages.stringMaxOrEqualLength(displayNames.fullName, 50) }),
  roleName: z
    .string({ message: errorMessages.invalid(displayNames.roleName) })
    .min(1, { message: errorMessages.required(displayNames.roleName) })
    .max(50, { message: errorMessages.stringMaxOrEqualLength(displayNames.roleName, 50) }),
  thumbnailUrl: z
    .string({ message: errorMessages.invalid(displayNames.thumbnail) })
    .max(255, { message: errorMessages.stringMaxOrEqualLength(displayNames.thumbnail, 255) })
    .nullish(),
  description: z
    .string({ message: errorMessages.invalid(displayNames.description) })
    .min(1, { message: errorMessages.required(displayNames.description) })
    .max(400, { message: errorMessages.stringMaxOrEqualLength(displayNames.description, 400) })
});

function createDetail(responseDto: MemberDetailResponseDto): MemberDetailModel {
  return {
    id: responseDto.id,
    fullName: responseDto.fullName,
    roleName: responseDto.roleName,
    thumbnailUrl: responseDto.thumbnailUrl,
    description: responseDto.description,
    get protectedDetailRoutePath(): string {
      return routeUtils.getProtectedMemberDetailRoutePath(this.id);
    },
    get protectedUpdateRoutePath(): string {
      return routeUtils.getProtectedMemberUpdateRoutePath(this.id);
    }
  };
}

function createUpsert(): MemberUpsertModel {
  return {
    id: 0,
    fullName: "",
    roleName: "",
    thumbnailUrl: null,
    description: "",
    get protectedDetailRoutePath(): string {
      return routeUtils.getProtectedMemberDetailRoutePath(this.id);
    },
    parseFromForm(formData: FormData): void {
      const formDataAsObject = formDataUtils.formDataToObject(formData);
      try {
        const parsedData = upsertSchema.parse(formDataAsObject);
        this.fullName = parsedData.fullName;
        this.roleName = parsedData.roleName;
        this.thumbnailUrl = parsedData.thumbnailUrl || null;
        this.description = parsedData.description;
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new ValidationError(error);
        }

        throw error;
      }
    },
    mapFromResponseDto(responseDto: MemberDetailResponseDto): void {
      this.id = responseDto.id;
      this.fullName = responseDto.fullName;
      this.roleName = responseDto.roleName;
      this.thumbnailUrl = responseDto.thumbnailUrl;
      this.description = responseDto.description;
    },
    toRequestDto(): MemberUpsertRequestDto {
      return {
        fullName: this.fullName,
        roleName: this.roleName,
        thumbnailUrl: this.thumbnailUrl,
        description: this.description
      };
    }
  };
}

export {
  createDetail as createMemberDetailModel,
  createUpsert as createMemberUpsertModel
}