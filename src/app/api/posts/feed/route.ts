import { getFeedPosts } from "@/src/backend/services/post.service";
import { connectDB } from "@/src/lib/db";
import { getErrorMessage } from "@/src/utils/errors";

export async function GET() {
  try {
    await connectDB();
    const posts = await getFeedPosts();

    return Response.json({ posts }, { status: 200 });
  } catch (error: unknown) {
    return Response.json(
      { error: getErrorMessage(error, "Unable to load posts.") },
      { status: 500 }
    );
  }
}
