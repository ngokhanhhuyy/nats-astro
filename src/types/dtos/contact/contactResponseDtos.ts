import { ContactType } from "@/enums/contactType";

declare global {
	type ContactResponseDto = {
		id: number;
		type: ContactType;
		content: string;
	};
}

export { };