import { z } from "astro:schema";
import { useFormDataUtils } from "@/utils/formDataUtils";
import { useDisplayNames } from "@/localization/displayNames";
import { useErrorMessages } from "@/errors";
import { ValidationError } from "@/errors";

const formDataUtils = useFormDataUtils();
const displayNames = useDisplayNames();
const errorMessages = useErrorMessages();

declare global {
  type SignInModel = {
    userName: string;
    password: string;
    parseFromForm(formData: FormData): void;
    toRequestDto(): SignInRequestDto;
  };
}

const schema = z.object({
  userName: z.string().min(1, { message: errorMessages.required(displayNames.userName) }),
  password: z.string().min(1, { message: errorMessages.required(displayNames.password) })
});

export function createSignInModel(): SignInModel {
  const model: SignInModel = {
    userName: "",
    password: "",
    parseFromForm(formData: FormData) {
      const formDataAsObject = formDataUtils.formDataToObject(formData);
      try {
        const parsedData = schema.parse(formDataAsObject);
        model.userName = parsedData.userName;
        model.password = parsedData.password;
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new ValidationError(error);
        }

        throw error;
      }
    },
    toRequestDto() {
      return {
        userName: this.userName,
        password: this.password
      }
    }
  };

  return model;
}