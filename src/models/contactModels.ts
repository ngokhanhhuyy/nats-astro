import { ContactType } from "@/enums/contactType";
import { z } from "astro:schema";
import { useErrorMessages } from "@/errors";
import { useDisplayNames } from "@/localization/displayNames";
import { useFormDataUtils } from "@/utils/formDataUtils";
import { useRouteUtils } from "@/utils/routeUtils";
import { ValidationError } from "@/errors";

const errorMessages = useErrorMessages();
const displayNames = useDisplayNames();
const formDataUtils = useFormDataUtils();
const routeUtils = useRouteUtils();

declare global {
  type ContactDetailModel = Readonly<{
    id: number;
    type: ContactType;
    content: string;
    protectedUpdateRoutePath: string;
  }>;

  type ContactUpsertModel = {
    id: number;
    type: ContactType;
    content: string;
    parseFromForm(formData: FormData): void;
    mapFromResponseDto(responseDto: ContactResponseDto): void;
    toRequestDto(): ContactUpsertRequestDto;
  };
}

const upsertSchema = z.object({
  type: z.nativeEnum(ContactType, { message: errorMessages.invalid(displayNames.type) }),
  content: z
    .string({ message: errorMessages.invalid(displayNames.content) })
    .min(1, { message: errorMessages.required(displayNames.content) })
}).superRefine((data, context) => {
  const phoneNumberRegExp = /^[^\-+\s][\d\-+\s]+$/g;
  const emailRegExp = /^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b$/g;
  let maximumLength: number;
  let regExp: RegExp | null = null;
  let displayName: string;

  switch (data.type) {
    case ContactType.PhoneNumber:
      displayName = displayNames.phoneNumber;
      maximumLength = 20;
      regExp = phoneNumberRegExp;
      break;
    case ContactType.ZaloNumber:
      displayName = displayNames.zaloNumber;
      maximumLength = 20;
      regExp = phoneNumberRegExp;
      break;
    case ContactType.Email:
      displayName = displayNames.email;
      maximumLength = 255;
      regExp = emailRegExp;
      break;
    case ContactType.Address:
      displayName = displayNames.address;
      maximumLength = 255;
      break;
    default:
      throw new Error(`Case data.type = ${data.type} hasn't been implemented.`);
  }

  if (data.content.length > maximumLength) {
    context.addIssue({
      code: z.ZodIssueCode.too_big,
      maximum: maximumLength,
      type: "string",
      inclusive: true,
      message: errorMessages.stringMaxOrEqualLength(displayName, maximumLength),
      path: ["content"]
    });

    return z.NEVER;
  }

  if (regExp && !regExp.test(data.content)) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: errorMessages.invalid(displayName),
      path: ["content"]
    });
  }
});

function createDetail(responseDto: ContactResponseDto): ContactDetailModel {
  return {
    id: responseDto.id,
    type: responseDto.type,
    content: responseDto.content,
    get protectedUpdateRoutePath(): string {
      return routeUtils.getProtectedContactUpdateRoutePath(this.id);
    }
  };
}

function createUpsert(): ContactUpsertModel {
  return {
    id: 0,
    type: ContactType.PhoneNumber,
    content: "",
    parseFromForm(formData: FormData): void {
      const formDataAsObject = formDataUtils.formDataToObject(formData);
      try {
        const parsedData = upsertSchema.parse(formDataAsObject);
        this.type = parsedData.type;
        this.content = parsedData.content;
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new ValidationError(error);
        }

        throw error;
      }
    },
    mapFromResponseDto(responseDto: ContactResponseDto): void {
      this.id = responseDto.id;
      this.type = responseDto.type;
      this.content = responseDto.content;
    },
    toRequestDto(): ContactUpsertRequestDto {
      return {
        type: this.type,
        content: this.content
      };
    }
  };
}

export {
  createDetail as createContactDetailModel,
  createUpsert as createContactUpsertModel
}