import { CatalogItemType } from "@/enums/catalogItemType";

declare global {
  type CatalogItemListRequestDto = Partial<{
    type: CatalogItemType;
  }>;

  type CatalogItemUpsertRequestDto = {
    name: string;
    type: CatalogItemType;
    summary: string;
    detail: string;
    thumbnailUrl: string | null;
  };
}

export { };