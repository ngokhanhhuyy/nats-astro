import { ValidationError } from "@/errors";
import { z } from "astro:schema";
import dot from "dot-object";

declare global {
  type SignInModel = {
    userName: string;
    password: string;
    parseFromForm(formData: FormData): void;
    toRequestDto(): SignInRequestDto;
  };
}

const parser = z.object({
  userName: z.string().min(1, { message: "Username cannot be left empty." }),
  password: z.string().min(1, { message: "Password cannot be left empty." })
});

export function createSignInModel(): SignInModel {
  const model: SignInModel = {
    userName: "",
    password: "",
    parseFromForm(formData: FormData) {
      const formDataAsObject: Partial<Record<string, FormDataEntryValue>> = { };
      for (const [path, value] of formData.entries()) {
        formDataAsObject[path] = value;
      }
      try {
        const parsedData = parser.parse(dot.object(formDataAsObject));
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