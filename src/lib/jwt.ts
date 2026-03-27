import jwt from "jsonwebtoken";
import type { JwtUser } from "@/src/types/user.types";

const JWT_SECRET = process.env.JWT_SECRET!;

export function generateToken(payload: JwtUser) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtUser {
  const decoded = jwt.verify(token, JWT_SECRET);

  if (typeof decoded === "string") {
    throw new Error("Invalid token");
  }

  return decoded as JwtUser;
}
