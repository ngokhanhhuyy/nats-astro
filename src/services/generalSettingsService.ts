import { type PrismaClient } from "@prisma/client";
import { createGeneralSettingsResponseDto }
  from "@/dtos/generalSettings/generalSettingsResponseDtos";
import { NotFoundError } from "@/errors";

export function useGeneralSettingsService(prisma: PrismaClient) {
  return {
    /**
     * Gets the general settings.
     *
     * @returns A {@link Promise} representing the asynchronous operation, which result is a
     * DTO containing the settings information.
     * @example getAsync();
     */
    async getAsync(): Promise<GeneralSettingsResponseDto> {
      const entity = await prisma.generalSettings.findFirst();
      if (!entity) {
        throw new NotFoundError();
      }
    
      return createGeneralSettingsResponseDto(entity);
    },
    
    /**
     * Updates the settings.
     *
     * @param requestDto A DTO containing the data for the updating operation.
     * @returns A {@link Promise} representing the asynchronous operation.
     * @example updateAsync({ ... });
     *
     * @throws {ConcurrencyError} Throws when there is a concurrency-related conflict occuring
     * during the operation.
     */
    async updateAsync(requestDto: GeneralSettingsUpdateRequestDto): Promise<void> {
      await prisma.generalSettings.update({
        where: {
          id: 1,
        },
        data: {
          applicationName: requestDto.applicationName,
          applicationShortName: requestDto.applicationShortName,
          isUnderMaintainance: requestDto.underMaintainance,
        },
      });
    }
  };
}

export type GeneralSettingsService = ReturnType<typeof useGeneralSettingsService>;