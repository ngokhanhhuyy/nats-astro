import type { PrismaClient } from "@prisma/client";
import { createAboutUsIntroductionResponseDto }
  from "@/dtos/aboutUsIntroduction/aboutUsIntroductionResponseDtos";

export function useAboutUsIntroductionService(prisma: PrismaClient) {
  return {
    /**
     * Gets the about us introduction.
     * 
     * @returns A {@link Promise} representing the asynchronous operation, which result is a
     * DTO containing the information of the about us introduction.
     */
    async getAsync(): Promise<AboutUsIntroductionResponseDto> {
      const aboutUsIntroduction = await prisma.aboutUsIntroduction.findFirstOrThrow();
      return createAboutUsIntroductionResponseDto(aboutUsIntroduction);
    },
  
    /**
     * Updates the about us introduction.
     * 
     * @param requestDto A DTO containing the data for the updating operation.
     * @returns A {@link Promise} representing the asynchronous operation.
     */
    async updateAsync(requestDto: AboutUsIntroductionUpdateRequestDto): Promise<void> {
      await prisma.aboutUsIntroduction.updateMany({
        data: {
          thumbnailUrl: requestDto.thumbnailUrl,
          mainQuoteContent: requestDto.mainQuoteContent,
          aboutUsContent: requestDto.aboutUsContent,
          whyChooseUsContent: requestDto.whyChooseUsContent,
          ourDifferenceContent: requestDto.ourDifferenceContent,
          ourCultureContent: requestDto.ourCultureContent
        }
      });
    }
  };
}

export type AboutUsIntroductionService = ReturnType<typeof useAboutUsIntroductionService>;