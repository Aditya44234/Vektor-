import type { Post } from "../types/post.types";
export type ProfileUser = {
  _id: string;
  username: string;
  profilePic?: string;
  bio?: string;
  interests?: string[];
  createdAt?: string;
};

export type ProfileResponse = {
  user: ProfileUser;
  posts: Post[];
};

export async function getProfileByUsernameAPI(username: string): Promise<ProfileResponse> {
  const trimmedusername = username.trim();

  if (!trimmedusername) {
    throw new Error("Username is required");
  }

  const res = await fetch(`/api/users/${encodeURIComponent(trimmedusername)}`);

  const payload: ProfileResponse & { error?: string } = await res.json();

  if (!res.ok) {
    throw new Error(payload.error || "Unable to load profile");
  }

  return payload;
}
