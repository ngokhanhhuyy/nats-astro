declare global {
	type AboutUsIntroductionUpdateRequestDto = {
		thumbnailFile: string | null;
		thumbnailChanged: boolean;
		mainQuoteContent: string;
		aboutUsContent: string;
		whyChooseUsContent: string;
		ourDifferenceContent: string;
		ourCultureContent: string;
	};
}

export { };