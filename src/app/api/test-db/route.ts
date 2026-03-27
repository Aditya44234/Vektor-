import { connectDB } from "@/src/lib/db";

export async function GET() {
    try {
        await connectDB();
        return Response.json({ message: "DB Connected .." })
    } catch {
        return Response.json({ error: "DB failed..." });
    }
}
