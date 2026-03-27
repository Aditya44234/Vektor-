import { searchUsers } from "@/src/backend/services/user.service";
import { connectDB } from "@/src/lib/db";
import { getErrorMessage } from "@/src/utils/errors";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";

    const users = await searchUsers(query);

    return Response.json({ users }, { status: 200 });
  } catch (error: unknown) {
    return Response.json(
      { error: getErrorMessage(error, "Unable to search users.") },
      { status: 500 }
    );
  }
}
