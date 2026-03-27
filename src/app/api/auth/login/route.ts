import { connectDB } from "@/src/lib/db";
import { loginUser } from "@/src/backend/services/user.service";
import { getErrorMessage } from "@/src/utils/errors";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json(
        { error: "Providde details are required." },
        { status: 400 }
      );
    }

    const { user, token } = await loginUser({
      email,
      password,
    });

    return Response.json(
      {
        message: "Login successful",
        token,
        user,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return Response.json(
      { error: getErrorMessage(error, "Login failed.") },
      { status: 401 }
    );
  }
}
