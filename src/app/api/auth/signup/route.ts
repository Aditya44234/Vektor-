
import { createUser } from "@/src/backend/services/user.service";
import { connectDB } from "@/src/lib/db";
import { getErrorMessage } from "@/src/utils/errors";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { username, email, password, profilePic, imageUrl } = body;

    if (!username || !email || !password) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await createUser({
      username,
      email,
      password,
      profilePic: profilePic ?? imageUrl ?? "",
    });

    return Response.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error: unknown) {
    return Response.json(
      { error: getErrorMessage(error, "Unable to create the user.") },
      { status: 500 }
    );
  }
}
