import { Prisma, PrismaClient } from "@prisma/client";
import { createAboutUsIntroductionResponseDto }
  from "@/dtos/aboutUsIntroduction/aboutUsIntroductionResponseDtos";

const service = {
  /**
   * Gets the about us introduction.
   * 
   * @returns A {@link Promise} representing the asynchronous operation, which result is a DTO
   * containing the information of the about us introduction.
   */
  async getAsync(): Promise<AboutUsIntroductionResponseDto> {
    const prisma = new PrismaClient();
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
    const prisma = new PrismaClient();
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
}

export function useAboutUsIntroductionService() {
  return service;
}