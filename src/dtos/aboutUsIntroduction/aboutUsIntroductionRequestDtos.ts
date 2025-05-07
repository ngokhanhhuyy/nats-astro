declare global {
  type AboutUsIntroductionUpdateRequestDto = {
    thumbnailUrl: string | null;
    mainQuoteContent: string | null;
    aboutUsContent: string;
    whyChooseUsContent: string;
    ourDifferenceContent: string;
    ourCultureContent: string;
  };
}

export { };