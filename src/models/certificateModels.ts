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
  type CertificateDetailModel = {
    id: number;
    name: string | null;
    thumbnailUrl: string | null;
    protectedDetailRoutePath: string;
    protectedUpdateRoutePath: string;
  };

  type CertificateUpsertModel = {
    id: number;
    name: string;
    thumbnailUrl: string;
    protectedDetailRoutePath: string;
    parseFromForm(formData: FormData): void;
    mapFromResponseDto(responseDto: CertificateDetailResponseDto): void;
    toRequestDto(): CertificateUpsertRequestDto;
  };
}

const upsertSchema = z.object({
  name: z
    .string({ message: errorMessages.invalid(displayNames.name) })
    .min(1, { message: errorMessages.required(displayNames.name) })
    .max(100, { message: errorMessages.stringMaxOrEqualLength(displayNames.name, 100) }),
  thumbnailUrl: z
    .string({ message: errorMessages.invalid(displayNames.thumbnail) })
    .min(1, { message: errorMessages.required(displayNames.thumbnail) })
    .max(255, { message: errorMessages.stringMaxOrEqualLength(displayNames.thumbnail, 255) })
});

function createDetail(responseDto: CertificateDetailResponseDto): CertificateDetailModel {
  return {
    id: responseDto.id,
    name: responseDto.name,
    thumbnailUrl: responseDto.thumbnailUrl,
    get protectedDetailRoutePath(): string {
      return routeUtils.getProtectedCertificateDetailRoutePath(this.id);
    },
    get protectedUpdateRoutePath(): string {
      return routeUtils.getProtectedCertificateUpdateRoutePath(this.id);
    }
  };
}

function createUpsert(): CertificateUpsertModel {
  return {
    id: 0,
    name: "",
    thumbnailUrl: "",
    get protectedDetailRoutePath(): string {
      return routeUtils.getProtectedCertificateDetailRoutePath(this.id);
    },
    parseFromForm(formData: FormData): void {
      const formDataAsObject = formDataUtils.formDataToObject(formData);
      try {
        const parsedData = upsertSchema.parse(formDataAsObject);
        this.name = parsedData.name;
        this.thumbnailUrl = parsedData.thumbnailUrl.trim();
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new ValidationError(error);
        }

        throw error;
      }
    },
    mapFromResponseDto(responseDto: CertificateDetailResponseDto): void {
      this.id = responseDto.id;
      this.name = responseDto.name ?? "";
      this.thumbnailUrl = responseDto.thumbnailUrl;
    },
    toRequestDto(): CertificateUpsertRequestDto {
      return {
        name: this.name,
        thumbnailUrl: this.thumbnailUrl,
      };
    }
  };
}

export {
  createDetail as createCertificateDetailModel,
  createUpsert as createCertificateUpsertModel
}