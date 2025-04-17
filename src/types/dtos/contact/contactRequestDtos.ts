import { ContactType } from "@/enums/contactType";

declare global {
	type ContactUpsertRequestDto = {
		type: ContactType;
		content: string;
	};
}

export { };