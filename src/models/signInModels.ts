import { zfd as zodForm } from "zod-form-data";
import { z as zod } from "astro:schema";

declare global {
  type SignInModel = {
    userName: string;
    password: string;
    toRequestDto(): SignInRequestDto;
  };
}

const signInSchema = zodForm.formData({
  userName: zodForm.text(zod.string({ required_error: "Username is required" })),
  password: zodForm.text(zod.string({ required_error: "Password is required" }))
});

function create(formData?: FormData): SignInModel {
  const model  = {
    userName: "",
    password: "",
    toRequestDto(): SignInRequestDto {
      return {
        userName: model.userName,
        password: model.password,
      };
    },
  }
  
  if (formData) {
    const parsedData = signInSchema.parse(formData);
    model.userName = parsedData.userName;
    model.password = parsedData.password;
  }

  return model;
}

export { create as createSignInModel }