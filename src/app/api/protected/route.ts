import { getUserFromRequest } from "@/src/lib/auth";
import { getErrorMessage } from "@/src/utils/errors";

export async function GET(req: Request) {
  try {
    const user = getUserFromRequest(req);

    return Response.json({
      message: "Access granted",
      user,
    });
  } catch (error: unknown) {
    return Response.json(
      { error: getErrorMessage(error, "Unauthorized") },
      { status: 401 }
    );
  }
}
