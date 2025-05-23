import { Prisma, type PrismaClient } from "@prisma/client";
import {
  createSummaryItemBasicResponseDto,
  createSummaryItemDetailResponseDto } from "@/dtos/summaryItem/summaryItemResponseDtos";
import { usePrismaClientErrorHandler, NotFoundError } from "@/errors";

const prismaClientErrorHandler = usePrismaClientErrorHandler();

export function useSummaryItemService(prisma: PrismaClient) {
  return {
    /**
     * Gets a list of all summary items with basic information.
     * 
     * @returns A {@link Promise} representing the asynchronous operation, which result is an
     * array of DTOs, containing the basic information of the summary items.
     */
    async getBasicListAsync(): Promise<SummaryItemBasicResponseDto[]> {
      const summaryItems = await prisma.summaryItem.findMany({
        select: {
          id: true,
          name: true,
          summaryContent: true,
          thumbnailUrl: true
        }
      });
      return summaryItems.map(item => createSummaryItemBasicResponseDto(item));
    },
  
    /**
     * Gets a list of all summary items with detail information.
     * 
     * @returns A {@link Promise} representing the asynchronous operation, which result is an
     * array of DTOs, containing the detail information of the summary items.
     */
    async getDetailListAsync(): Promise<SummaryItemDetailResponseDto[]> {
      const summaryItems = await prisma.summaryItem.findMany();
      return summaryItems.map(item => createSummaryItemDetailResponseDto(item));
    },
  
    /**
     * Gets a single existing summary item, specified by its id, with basic information.
     * 
     * @param id The id of the summary item to retrieve.
     * @returns A {@link Promise} representing the asynchronous operation, which result is a
     * DTO containing the basic information summary item.
     * 
     * @throws {NotFoundError} Throws when the slider item specified by {@link id} doesn't
     * exist.
     */
    async getBasicAsync(id: number): Promise<SummaryItemBasicResponseDto> {
      const summaryItem = await prisma.summaryItem.findFirst({
        select: {
          id: true,
          name: true,
          summaryContent: true,
          thumbnailUrl: true
        }
      });
      if (!summaryItem) {
        throw new NotFoundError();
      }
  
      return createSummaryItemBasicResponseDto(summaryItem);
    },
  
    /**
     * Gets a single existing summary item, specified by its id, with detail information.
     * 
     * @param id The id of the summary item to retrieve.
     * @returns A {@link Promise} representing the asynchronous operation, which result is a
     * DTO containing the detail information summary item.
     * 
     * @throws {NotFoundError} Throws when the slider item specified by {@link id} doesn't
     * exist.
     */
    async getDetailAsync(id: number): Promise<SummaryItemDetailResponseDto> {
      const summaryItem = await prisma.summaryItem.findFirst();
      if (!summaryItem) {
        throw new NotFoundError();
      }
  
      return createSummaryItemDetailResponseDto(summaryItem);
    },
  
    /**
     * Updates an existing summary item, specified by its id.
     * 
     * @param id The id of the summary item to update.
     * @param requestDto A DTO containing the data for the updating operation.
     * 
     * @throws {NotFoundError} Throws when the summary item, specified by {@link id} doesn't
     * exist.
     */
    async updateAsync(id: number, requestDto: SummaryItemUpdateRequestDto): Promise<void> {
      try {
        await prisma.summaryItem.update({
          where: { id },
          data: {
            name: requestDto.name,
            summaryContent: requestDto.summaryContent,
            detailContent: requestDto.detailContent,
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
    }
  };
}

export type SummaryItemService = ReturnType<typeof useSummaryItemService>;