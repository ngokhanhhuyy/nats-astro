import { PrismaClient } from "@prisma/client";
import { createSliderItemResponseDto } from "@/dtos/sliderItem/sliderItemResponseDtos";
import { OperationError, NotFoundError } from "@/errors";

/**
 * Gets a list of all slider items.
 *
 * @returns A {@link Promise} representing the asynchronous operation, which result is an
 * array of DTOs containing the information of the slider items.
 * @example getListAsync();
 */
async function getListAsync(): Promise<SliderItemResponseDto[]> {
  const prisma = new PrismaClient();
  const sliderItems = await prisma.sliderItem.findMany();
  return sliderItems.map(item => createSliderItemResponseDto(item));
}

export {
  getListAsync
}