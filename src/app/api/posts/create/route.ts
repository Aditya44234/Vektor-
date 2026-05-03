import { createPost } from "@/src/backend/services/post.service";
import { getUserFromRequest } from "@/src/lib/auth";
import { connectDB } from "@/src/lib/db";
import { getErrorMessage } from "@/src/utils/errors";

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = getUserFromRequest(req);
    const body = await req.json();
    const { content, imageUrl ,videoUrl} = body;

    if (!content) {
      return Response.json({ error: "Content required" }, { status: 400 });
    }

    const post = await createPost({
      userId: user.userId,
      content,
      imageUrl,
      videoUrl,
    });

    return Response.json({ message: "post created", post }, { status: 201 });
  } catch (error: unknown) {
    return Response.json(
      { error: getErrorMessage(error, "Unable to create the post.") },
      { status: 401 }
    );
  }
}


