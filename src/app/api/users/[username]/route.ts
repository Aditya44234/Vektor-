import { getPostByUserId } from "@/src/backend/services/post.service";
import { getPublicUserByUsername } from "@/src/backend/services/user.service";
import { connectDB } from "@/src/lib/db";
import { getErrorMessage } from "@/src/utils/errors";

export async function GET(
    _req: Request,
    context: { params: Promise<{ username: string }> }
) {
    try {
        await connectDB();

        const { username } = await context.params;

        const user = await getPublicUserByUsername(username);
        const posts = await getPostByUserId(user._id);

        return Response.json(
            {
                user,
                posts,
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        const message = getErrorMessage(error, "Unable to load profile.");

        return Response.json(
            { error: message },
            {
                status: message === "User not found" ? 404 : 500,
            }
        );
    }
}
