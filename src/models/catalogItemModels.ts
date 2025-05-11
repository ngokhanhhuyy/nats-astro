import { CatalogItemType } from "@/enums/catalogItemType";
import { z } from "astro:schema";
import { useErrorMessages } from "@/errors";
import { useDisplayNames } from "@/localization/displayNames";
import { useFormDataUtils } from "@/utils/formDataUtils";
import { useRouteUtils } from "@/utils/routeUtils";
import { usePhotoUtils } from "@/utils/photoUtils";
import { ValidationError } from "@/errors";

declare global {
  type CatalogItemListModel = {
    type: CatalogItemType;
    items: CatalogItemBasicModel[];
    parseFromSearchParams(searchParams: URLSearchParams): void;
    mapFromResponseDtos(responseDtos: CatalogItemBasicResponseDto[]): void;
  };

  type CatalogItemBasicModel = Readonly<{
    id: number;
    name: string;
    type: CatalogItemType;
    summary: string;
    thumbnailUrl: string
    publicDetailRoutePath: string;
    protectedDetailRoutePath: string;
    protectedUpdateRoutePath: string;
  }>;

  type CatalogItemDetailModel = Readonly<CatalogItemBasicModel & { detail: string; }>;

  type CatalogItemUpsertModel = {
    id: number;
    name: string;
    type: CatalogItemType;
    summary: string;
    detail: string;
    thumbnailUrl: string | null;
    protectedDetailRoutePath: string;
    parseFromForm(formData: FormData): void;
    mapFromResponseDto(responseDto: CatalogItemDetailResponseDto): void;
    toRequestDto(): CatalogItemUpsertRequestDto;
  };
}

const errorMessages = useErrorMessages();
const displayNames = useDisplayNames();
const formDataUtils = useFormDataUtils();
const routeUtils = useRouteUtils();
const photoUtils = usePhotoUtils();

const listSchema = z.object({
  type: z.nativeEnum(CatalogItemType, { message: errorMessages.invalid(displayNames.type) }),
});

const upsertSchema = z.object({
  name: z
    .string({ message: errorMessages.invalid(displayNames.name) })
    .min(1, { message: errorMessages.required(displayNames.name) }),
  type: z.nativeEnum(CatalogItemType, { message: errorMessages.invalid(displayNames.type) }),
  summary: z
    .string({ message: errorMessages.invalid(displayNames.summary) })
    .min(1, { message: errorMessages.required(displayNames.summary) })
    .max(255, { message: errorMessages.stringMaxOrEqualLength(displayNames.summary, 255) }),
  detail: z
    .string({ message: errorMessages.invalid(displayNames.detail) })
    .min(1, { message: errorMessages.required(displayNames.detail) })
    .max(100_000, {
      message: errorMessages.stringMaxOrEqualLength(displayNames.detail, 100_000)
    }),
  thumbnailUrl: z
    .string({ message: errorMessages.invalid(displayNames.thumbnail) })
    .nullish()
});

function createList(): CatalogItemListModel {
  return {
    type: CatalogItemType.Course,
    items: [],
    parseFromSearchParams(searchParams: URLSearchParams): void {
      try {
        const searchParamsAsObject = formDataUtils.searchParamsToObject(searchParams);
        const parsedData = listSchema.parse(searchParamsAsObject);
        this.type = parsedData.type;
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new ValidationError(error);
        }

        throw error;
      }
    },
    mapFromResponseDtos(responseDtos): void {
      this.items = responseDtos.map(dto => createBasic(dto));
    },
  };
}

function createBasic(responseDto: CatalogItemBasicResponseDto): CatalogItemBasicModel {
  return {
    id: responseDto.id,
    name: responseDto.name,
    type: responseDto.type,
    summary: responseDto.summary,
    thumbnailUrl: responseDto.thumbnailUrl ?? photoUtils.getDefaultPhotoUrl(),
    get publicDetailRoutePath(): string {
      switch (this.type) {
        case CatalogItemType.Course:
          return routeUtils.getPublicCourseDetailRoutePath(this.id);
        case CatalogItemType.Service:
          return routeUtils.getPublicServiceDetailRoutePath(this.id);
        case CatalogItemType.Product:
          return routeUtils.getPublicProductDetailRoutePath(this.id);
      }
    },
    get protectedDetailRoutePath(): string {
      return routeUtils.getProtectedCatalogItemDetailRoutePath(this.id);
    },
    get protectedUpdateRoutePath(): string {
      return routeUtils.getProtectedCatalogItemUpdateRoutePath(this.id);
    }
  };
}

function createDetail(responseDto: CatalogItemDetailResponseDto): CatalogItemDetailModel {
  return {
    ...createBasic(responseDto),
    detail: responseDto.detail
  };
}

function createUpsert(): CatalogItemUpsertModel {
  return {
    id: 0,
    name: "",
    type: CatalogItemType.Course,
    summary: "",
    detail: "",
    thumbnailUrl: "",
    get protectedDetailRoutePath(): string {
      return routeUtils.getProtectedCatalogItemDetailRoutePath(this.id);
    },
    parseFromForm(formData): void {
      const formDataAsObject = formDataUtils.formDataToObject(formData);
      try {
        const parsedData = upsertSchema.parse(formDataAsObject);
        this.name = parsedData.name;
        this.type = parsedData.type;
        this.summary = parsedData.summary;
        this.detail = parsedData.detail;
        this.thumbnailUrl = parsedData.thumbnailUrl ?? null
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new ValidationError(error);
        }

        throw error;
      }
    },
    mapFromResponseDto(responseDto: CatalogItemDetailResponseDto): void {
      this.id = responseDto.id;
      this.name = responseDto.name;
      this.type = responseDto.type;
      this.summary = responseDto.summary;
      this.detail = responseDto.detail;
      this.thumbnailUrl = responseDto.thumbnailUrl;
    },
    toRequestDto(): CatalogItemUpsertRequestDto {
      return {
        name: this.name,
        type: this.type,
        summary: this.summary,
        detail: this.detail,
        thumbnailUrl: this.thumbnailUrl
      };
    }
  }
}

export {
  createList as createCatalogItemListModel,
  createBasic as createCatalogItemBasicModel,
  createDetail as createCatalogItemDetailModel,
  createUpsert as createCatalogItemUpsertModel
}