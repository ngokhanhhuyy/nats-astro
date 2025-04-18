import { ThumbnailType } from "@/enums/thumbnailType";

declare global {
	type AboutUsIntroductionResponseDto = {
		thumbnailUrl: string | null,
		thumbnailType: ThumbnailType,
		mainQuoteContent: string,
		aboutUsContent: string,
		whyChooseUsContent: string,
		ourDifferenceContent: string,
		ourCultureContent: string,
	}
}