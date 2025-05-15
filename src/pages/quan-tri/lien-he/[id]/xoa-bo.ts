import type { APIRoute } from "astro";
import { NotFoundError } from "@/errors";

export const POST: APIRoute = async ({ params, locals }) => {
  const notFoundResponse = new Response(null, { status: 400 });

  const id = parseInt(params.id as string);
  if (isNaN(id)) {
    return notFoundResponse;
  }

  try {
    locals.services.contactService.deleteAsync(id);
    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw notFoundResponse;
    }

    throw error;
  }
};