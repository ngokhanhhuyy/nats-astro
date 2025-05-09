import { CatalogItemType } from "@/enums/catalogItemType";
import { z } from "astro:schema";
import { useErrorMessages } from "@/errors";
import { useDisplayNames } from "@/localization/displayNames";
import { useFormDataUtils } from "@/utils/formDataUtils";
import { useRouteUtils } from "@/utils/routeUtils";
import { ValidationError } from "@/errors";

declare global {
  type CatalogItemListModel = {
    type: CatalogItemType;
  };

  type CatalogItemBasicModel = Readonly<{
    id: number;
    name: string;
    type: CatalogItemType;
    summary: string;
    thumbnailUrl: string | null;
    publicDetailRoutePath: string;
    protectedDetailRoutePath: string;
    protectedUpdateRoutePath: string;
  }>;

  type CatalogItemDetailModel = Readonly<CatalogItemBasicModel & { detail: string; }>;

  type CatalogItemUpsertModel = {
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

const upsertSchema = z.object({
  
});

function createBasic(responseDto: CatalogItemBasicResponseDto): CatalogItemBasicModel {
  return {
    id: responseDto.id,
    name: responseDto.name,
    type: responseDto.type,
    summary: responseDto.summary,
    thumbnailUrl: responseDto.thumbnailUrl,
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

function createUpsert() {

}