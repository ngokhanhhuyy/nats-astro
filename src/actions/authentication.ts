import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { generateTokenAsync } from "@/services/authenticationService";
import { ValidationError, OperationError } from "@/errors";

export const signInAction = defineAction({
  accept: "form",
  input: z.object({
    userName: z.string({ required_error: "Username is required" }),
    password: z.string({ required_error: "Password is required" }),
  }) satisfies z.ZodType<SignInRequestDto>,
  handler: async (requestDto, context) => {
    try {
      const token = await generateTokenAsync(requestDto);
      context.cookies.set("Authorization", `Bearer ${token}`);
      return new Response();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages: Record<string, string> = { };
        for (const issue of error.issues) {
          const path = issue.path.map((element, index, issues) => {
            const formattedElement = typeof element === "number" ? `[${element}]` : element;
            if (index < issues.length - 1) {
              return formattedElement + ".";
            }
  
            return formattedElement;
          }).join("");
  
          errorMessages[path] = issue.message;
        }
  
        throw new ValidationError(errorMessages);
      }
  
      throw error;
    }
  }
});
