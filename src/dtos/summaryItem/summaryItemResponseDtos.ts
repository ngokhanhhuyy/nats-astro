import type { SummaryItem } from "@prisma/client";

declare global {
  type SummaryItemBasicResponseDto = {
    id: number;
    name: string;
    summaryContent: string;
    thumbnailUrl: string | null;
  }

  type SummaryItemDetailResponseDto = SummaryItemBasicResponseDto & { detailContent: string };
}

type SliderItemBasic = Pick<SummaryItem, "id" | "name" | "summaryContent" | "thumbnailUrl">;

function createBasic(summaryItem: SliderItemBasic): SummaryItemBasicResponseDto {
  return {
    id: summaryItem.id,
    name: summaryItem.name,
    summaryContent: summaryItem.summaryContent,
    thumbnailUrl: summaryItem.thumbnailUrl
  };
}

function createDetail(summaryItem: SummaryItem): SummaryItemDetailResponseDto {
  return {
    ...createBasic(summaryItem),
    detailContent: summaryItem.detailContent,
  };
} 

export {
  createBasic as createSummaryItemBasicResponseDto,
  createDetail as createSummaryItemDetailResponseDto,
};