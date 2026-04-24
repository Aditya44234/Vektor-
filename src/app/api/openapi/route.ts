import { openApiDocument } from "@/src/lib/openapi";

export async function GET() {
  return Response.json(openApiDocument, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

