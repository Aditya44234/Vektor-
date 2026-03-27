import { hashPassword, comparePassword } from "@/src/utils/hash";
import { User } from "@/src/models/User";
import { generateToken } from "@/src/lib/jwt";
import type { UserProfile } from "@/src/types/user.types";

type PublicUser = UserProfile & {
  profilePic: string;
  bio: string;
  interests: string[];
};

type SerializableUser = {
  _id: unknown;
  username: string;
  email: string;
  profilePic?: string;
  bio?: string;
  interests?: string[];
  toObject?: () => SerializableUser;
};

function serializeUser(user: SerializableUser): PublicUser {
  const source = typeof user?.toObject === "function" ? user.toObject() : user;

  return {
    _id: String(source._id),
    username: source.username,
    email: source.email,
    profilePic: source.profilePic ?? "",
    bio: source.bio ?? "",
    interests: Array.isArray(source.interests) ? source.interests : [],
  };
}

export async function createUser(data: {
  username: string;
  email: string;
  password: string;
}) {
  const { username, email, password } = data;

  const existing = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existing) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return serializeUser(user);
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const { email, password } = data;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    userId: String(user._id),
    email: user.email,
  });

  return { user: serializeUser(user as SerializableUser), token };
}

export async function searchUsers(query: string) {
  if (!query) return [];

  const users = await User.find({
    username: {
      $regex: query,
      $options: "i",
    },
  })
    .select("username profilePic")
    .limit(10);

  return users;
}
