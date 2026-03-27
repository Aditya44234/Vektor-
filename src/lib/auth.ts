import type { JwtUser } from "@/src/types/user.types";
import { verifyToken } from "./jwt";

export function getUserFromRequest(req: Request): JwtUser {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    return verifyToken(token);
  } catch {
    throw new Error("Invalid token");
  }
}
