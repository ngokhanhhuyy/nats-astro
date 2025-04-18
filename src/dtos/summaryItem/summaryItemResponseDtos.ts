declare global {
	type SummaryItemResponseDto = {
		id: number;
		name: string;
		summaryContent: string;
		detailContent: string;
		thumbnailUrl: string | null;
	}
}

export { };