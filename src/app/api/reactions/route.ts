import { connectDB } from "@/src/lib/db";
import { getUserFromRequest } from "@/src/lib/auth";
import { toggleReaction } from "@/src/backend/services/reaction.service";
import { getErrorMessage } from "@/src/utils/errors";

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = getUserFromRequest(req);
    const body = await req.json();
    const { postId, type } = body;

    if (!postId || !type) {
      return Response.json(
        { error: "postId and type required" },
        { status: 400 }
      );
    }

    if (!["like", "piss"].includes(type)) {
      return Response.json(
        { error: "Invalid reaction type" },
        { status: 400 }
      );
    }

    const post = await toggleReaction({
      postId,
      userId: user.userId,
      type,
    });

    return Response.json(
      {
        message: "Reaction updated",
        post,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return Response.json(
      { error: getErrorMessage(error, "Unable to update the reaction.") },
      { status: 401 }
    );
  }
}
