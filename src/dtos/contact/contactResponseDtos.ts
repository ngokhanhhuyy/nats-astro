import type { Contact } from "@prisma/client";
import { ContactType } from "@/enums/contactType";

declare global {
  type ContactResponseDto = {
    id: number;
    type: ContactType;
    content: string;
  };
}

export function createContactResponseDto(contact: Contact): ContactResponseDto {
  return {
    id: contact.id,
    type: ContactType[contact.type],
    content: contact.content
  };
}