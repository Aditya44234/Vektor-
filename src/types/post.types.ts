import type { UserProfile } from "./user.types";

export type PostAuthor = Pick<UserProfile, "_id" | "username" | "profilePic">;

export type Post = {
  _id: string;
  userId: string | PostAuthor;
  content: string;
  imageUrl?: string;
  videoUrl?:string; 
  category?: string;
  likes: string[];
  piss: string[];
  createdAt?: string;
  updatedAt?: string;
};
