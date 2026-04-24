import { connectDB } from "@/src/lib/db";
import { User } from "@/src/models/User";
import { getErrorMessage } from "@/src/utils/errors";
export async function GET() {
    try {
        await connectDB()

        const all_posts = await User.find();

        if (!all_posts) {
            return Response.json({
                "Message": "No Users found"
            });
        }


        return Response.json({
            "Users data": all_posts
        })

    } catch (error: unknown) {
        const message = getErrorMessage(error, "Unable to load Users data");

        return Response.json(
            { error: message },
            {
                status: message === "Users not found" ? 404 : 500,
            }
        );
    }
}