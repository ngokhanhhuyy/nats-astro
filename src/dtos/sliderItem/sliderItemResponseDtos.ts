import type { SliderItem } from "@prisma/client";

declare global {
  type SliderItemResponseDto = {
    id: number;
    title: string | null;
    index: number;
    thumbnailUrl: string;
  };
}

function createSliderItemResponseDto(sliderItem: SliderItem): SliderItemResponseDto {
  return {
    id: sliderItem.id,
    title: sliderItem.title,
    index: sliderItem.index,
    thumbnailUrl: sliderItem.thumbnailUrl
  };
}

export { createSliderItemResponseDto };
