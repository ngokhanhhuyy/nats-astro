import { CatalogItemType as PrismaCatalogItemType, type CatalogItem } from "@prisma/client";
import { CatalogItemType } from "@/enums/catalogItemType";

declare global {
  type CatalogItemBasicResponseDto = {
    id: number;
    name: string;
    type: CatalogItemType;
    summary: string;
    thumbnailUrl: string | null;
  };

  type CatalogItemDetailResponseDto = {
    id: number;
    name: string;
    type: CatalogItemType;
    summary: string;
    detail: string;
    thumbnailUrl: string | null;
    otherItems: CatalogItemBasicResponseDto[];
  };
}

function createBasic(catalogItem: CatalogItem): CatalogItemBasicResponseDto {
	return {
		id: catalogItem.id,
		name: catalogItem.name,
		type: CatalogItemType[catalogItem.type],
		summary: catalogItem.summary,
		thumbnailUrl: catalogItem.thumbnailUrl
	};
}

function createDetail(
		catalogItem: CatalogItem,
		otherItems: CatalogItem[]): CatalogItemDetailResponseDto {
	return {
		...createBasic(catalogItem),
		detail: catalogItem.detail,
		otherItems: otherItems.map(item => createBasic(item))
	}
}

export {
	createBasic as createCatalogItemBasicResponseDto,
	createDetail as createCatalogItemDetailResponseDto,
};
