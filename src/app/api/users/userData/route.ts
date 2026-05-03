import { connectDB } from "@/src/lib/db";
import { User } from "@/src/models/User";
import { getErrorMessage } from "@/src/utils/errors";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find(
      {},
      "username email profilePic bio interests createdAt"
    ).lean().sort({ createdAt: -1 });

    return Response.json(
      {
        "Users data": users,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = getErrorMessage(error, "Unable to load Users data");

    return Response.json(
      { error: message },
      {
        status: 500,
      }
    );
  }
}
