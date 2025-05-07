import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const key = "6d207e02198a847aa98d0a2a901485a5";
  const response = await fetch(`https://freeimage.host/api/1/upload?key=${key}`, request);
  const json = await response.json();
  console.log(json);
  return new Response(JSON.stringify({
    thumbnailUrl: json.image.thumb.url,
    imageUrl: json.image.image.url
  }));
};