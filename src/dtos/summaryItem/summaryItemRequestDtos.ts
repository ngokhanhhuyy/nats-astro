declare global {
  type SummaryItemUpdateRequestDto = {
    name: string;
    summaryContent: string;
    detailContent: string;
    thumbnailUrl: string | null;
  };
}

export { };