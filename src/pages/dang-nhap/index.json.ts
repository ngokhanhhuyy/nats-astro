import type { APIRoute } from "astro";
import { z } from "astro:schema";
import { parseToSignInRequestDto } from "@/dtos/signIn/signInRequestDtos"; 
import { generateTokenAsync } from "@/services/authenticationService";
import { OperationError } from "@/errors";

export const POST: APIRoute = async ({ cookies, request }) => {
  try {
    const requestDto = parseToSignInRequestDto(await request.json());
    const token = await generateTokenAsync(requestDto);
    cookies.set("Authorization", `Bearer ${token}`);
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

      return new Response(JSON.stringify(errorMessages), { status: 400 });
    }

    if (error instanceof OperationError) {
      return new Response(JSON.stringify(error.errorMessages), { status: 422 });
    }

    throw error;
  }
};