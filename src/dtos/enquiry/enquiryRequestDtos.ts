declare global {
	type EnquiryCreateRequestDto = {
		fullName: string;
		phoneNumber: string;
		email: string | null;
		content: string;
	};
}

export { };