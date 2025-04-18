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
		photos: CatalogItemDetailPhotoResponseDto[];
		otherItems: CatalogItemBasicResponseDto[];
	}

	type CatalogItemDetailPhotoResponseDto = {
		id: number;
		url: string;
		description: string | null;
	}
}

export { };