import { Prisma, type PrismaClient } from "@prisma/client";
import { createSliderItemResponseDto } from "@/dtos/sliderItem/sliderItemResponseDtos";
import { usePrismaClientErrorHandler, NotFoundError } from "@/errors";

const prismaClientErrorHandler = usePrismaClientErrorHandler();

export function useSliderItemService(prisma: PrismaClient) {
  return {
    /**
     * Gets a list of all slider items.
     *
     * @returns A {@link Promise} representing the asynchronous operation, which result is an
     * array of DTOs containing the information of the slider items.
     * @example getListAsync();
     */
    async getListAsync(): Promise<SliderItemResponseDto[]> {
      const sliderItems = await prisma.sliderItem.findMany();
      return sliderItems.map(item => createSliderItemResponseDto(item));
    },
  
    /**
     * Gets a single existing slider item, specified by its id.
     * 
     * @param id The id of the slider item to retrieves.
     * @returns A {@link Promise} representing the asynchronous operation, which result is a
     * DTO containing the information of the slider item.
     * 
     * @throws {NotFoundError} Throws when the slider item with the id specified by {@link id}
     * doesn't exist.
     */
    async getSingleAsync(id: number): Promise<SliderItemResponseDto> {
      const sliderItem = await prisma.sliderItem.findUnique({ where: { id } });
      if (!sliderItem) {
        throw new NotFoundError();
      }
  
      return createSliderItemResponseDto(sliderItem);
    },
  
    /**
     * Creates a new slider item.
     * 
     * @param requestDto A DTO containing the data for the creating operation.
     * @returns A {@link Promise} representing the asynchronous operation, which result is the
     * id of the created slider item.
     */
    async createAsync(requestDto: SliderItemUpsertRequestDto): Promise<number> {
      const sliderItem = await prisma.sliderItem.create({
        data: {
          title: requestDto.title,
          thumbnailUrl: requestDto.thumbnailUrl
        }
      });
  
      return sliderItem.id;
    },
  
    /**
     * Updates an existing slider item, specified by its id.
     * 
     * @param id The id of the slider item to update.
     * @param requestDto A DTO containing the data for the updating operation.
     * @returns A {@link Promise} representing the asynchronous operation.
     * 
     * @throws {NotFoundError} Throws when the slider item specified by {@link id} doesn't
     * exist.
     */
    async updateAsync(id: number, requestDto: SliderItemUpsertRequestDto): Promise<void> {
      try {
        await prisma.sliderItem.update({
          where: { id },
          data: {
            title: requestDto.title,
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
     * Deltes an existing slider item, specified by its id.
     * 
     * @param id The id of the slider item to delete.
     * @returns A {@link Promise} representing the asynchronous operation.
     * 
     * @throws {NotFoundError} Throws when the slider item specified by {@link id} doesn't
     * exist.
     */
    async deleteAsync(id: number): Promise<void> {
      try {
        await prisma.sliderItem.delete({ where: { id } });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          const handledResult = prismaClientErrorHandler.handle(error);
          if (handledResult.isNotFoundError) {
            throw new NotFoundError();
          }
  
          throw error;
        }
      }
    }
  };
}

export type SliderItemService = ReturnType<typeof useSliderItemService>;