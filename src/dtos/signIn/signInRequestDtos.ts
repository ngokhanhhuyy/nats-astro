import { z } from "astro:schema";
import { ValidationError } from "@/errors";

declare global {
  type SignInRequestDto = {
    userName: string;
    password: string;
  }
}

const schema = z.object({
  userName: z.string().min(6),
  password: z.string().min(6)
});

function parseToSignInRequestDto(json: any): SignInRequestDto {
  try {
    return schema.parse(json);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(error);
    } else {
      throw error;
    }
  }
}

export { parseToSignInRequestDto };