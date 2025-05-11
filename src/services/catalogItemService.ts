import { Prisma, type PrismaClient } from "@prisma/client";
import type { CatalogItemType as PrismaCatalogItemType } from "@prisma/client";
import { CatalogItemType } from "@/enums/catalogItemType";
import {
  createCatalogItemBasicResponseDto,
  createCatalogItemDetailResponseDto,
} from "@/dtos/catalogItem/catalogItemResponseDtos";
import { usePrismaClientErrorHandler, NotFoundError } from "@/errors";

type ListRequestDto = CatalogItemListRequestDto;
type UpsertRequestDto = CatalogItemUpsertRequestDto;
type BasicResponseDto = CatalogItemBasicResponseDto;
type DetailResponseDto = CatalogItemDetailResponseDto;

const prismaClientErrorHandler = usePrismaClientErrorHandler();

export function useCatalogItemService(prisma: PrismaClient) {
  return {
    /**
     * Gets the list of all catalog items with basic information. If the value for
     * {@link requestDto} or `requestDto.type` is not specified, all of the catalog items will
     * be retrieved.
     * 
     * @param requestDto (Optional) A DTO containing the conditions for the results.
     * @returns A {@link Promise} representing the asynchronous operation, which result is an
     * array of DTOs, containing the information of the catalog items.
     */
    async getListAsync(requestDto?: ListRequestDto): Promise<BasicResponseDto[]> {
      let type: string | undefined = undefined;
      if (requestDto?.type != null) {
        const keys = Object.keys(CatalogItemType);
        type = keys[Object.values(CatalogItemType).indexOf(requestDto.type)];
      }
  
      const catalogItems = await prisma.catalogItem.findMany({
        where: { type: type as PrismaCatalogItemType | undefined }
      });
      
      return catalogItems.map(item => createCatalogItemBasicResponseDto(item));
    },
  
    /**
     * Gets a specific catalog item, specified by its id.
     * 
     * @param id The id of the catalog item to retrieve.
     * @returns A {@link Promise} representing the asynchronous operation, which result is a
     * DTO containing the information of the catalog item.
     * 
     * @throws {NotFoundError} Throws when the catalog item, specified by {@link id}, doesn't
     * exist.
     */
    async getDetailAsync(id: number): Promise<DetailResponseDto> {
      const [catalogItem, otherItems] = await Promise.all([
        prisma.catalogItem.findUnique({ where: { id } }),
        prisma.catalogItem.findMany({
          where: {
            NOT: {
              id
            }
          }
        })
      ]);
  
      if (!catalogItem) {
        throw new NotFoundError();
      }
  
      return createCatalogItemDetailResponseDto(catalogItem, otherItems);
    },
  
    /**
     * Creates a new catalog item with the given data.
     * 
     * @param requestDto A DTO containing the data for the creating operation.
     * @returns A {@link Promise} representing the asynchronous operation, which result is the
     * id of the created catalog item.
     */
    async createAsync(requestDto: UpsertRequestDto): Promise<number> {
      const keys = Object.keys(CatalogItemType);
      const index = Object.values(CatalogItemType).indexOf(requestDto.type);
      const type = keys[index] as PrismaCatalogItemType;
      const catalogItem = await prisma.catalogItem.create({
        data: {
          name: requestDto.name,
          type,
          summary: requestDto.summary,
          detail: requestDto.detail,
          thumbnailUrl: requestDto.thumbnailUrl,
        }
      });
  
      return catalogItem.id;
    },
  
    /**
     * Updates an existing catalog item, specified by its id.
     * @param id The id of the catalog item to update.
     * @param requestDto A DTO containing the data for the updating operation.
     * @returns A {@link Promise} representing the asynchronous operation.
     * 
     * @throws {NotFoundError} Throws when the catalog item, specified by {@link id}, doesn't
     * exist.
     */
    async updateAsync(id: number, requestDto: UpsertRequestDto): Promise<void> {
      const keys = Object.keys(CatalogItemType);
      const index = Object.values(CatalogItemType).indexOf(requestDto.type);
      const type = keys[index] as PrismaCatalogItemType;
  
      try {
        await prisma.catalogItem.update({
          where: { id },
          data: {
            name: requestDto.name,
            type,
            summary: requestDto.summary,
            detail: requestDto.detail,
            thumbnailUrl: requestDto.thumbnailUrl
          }
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          const handledResult = prismaClientErrorHandler.handle(error);
          if (handledResult.isNotFoundError) {
            throw new NotFoundError();
          }
        }
  
        throw error;
      }
    },
  
    /**
     * Deletes an existing catalog item, specified by its id.
     * 
     * @param id The id of the catalog item to delete.
     * @returns A {@link Promise} representing the asynchronous operation.
     * 
     * @throws {NotFoundError} Throws when the catalog item, specified by {@link id} doesn't
     * exist.
     */
    async deleteAsync(id: number): Promise<void> {
      try {
        await prisma.catalogItem.delete({
          where: { id }
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          const handledResult = prismaClientErrorHandler.handle(error);
          if (handledResult.isNotFoundError) {
            throw new NotFoundError();
          }
        }
  
        throw error;
      }
    }
  };
}

export type CatalogItemService = ReturnType<typeof useCatalogItemService>;