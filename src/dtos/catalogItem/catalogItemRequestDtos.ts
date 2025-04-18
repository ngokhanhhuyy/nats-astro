import { CatalogItemType } from "@/enums/catalogItemType";

declare global {
  type CatalogItemListRequestDto = Partial<{
    type: CatalogItemType;
  }>;

  type CatalogItemUpsertRequestDto = {
    name: string;
    summary: string;
    detail: string;
    thumbnailFile: string | null;
    thumbnailChanged: boolean;
    photos: CatalogItemUpsertPhotoRequestDto[];
  };

  type CatalogItemUpsertPhotoRequestDto = {
    id: number | null;
    file: string | null;
    description: string | null;
    isDeleted: boolean;
  };
}

export { };