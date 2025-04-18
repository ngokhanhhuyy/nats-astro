declare global {
	type SummaryItemUpdateRequestDto = {
		name: string;
		summaryContent: string | null;
		detailContent: string;
		thumbnailFile: string | null;
		thumbnailChanged: boolean;
	};
}

export { };