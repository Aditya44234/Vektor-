export type UserProfile = {
  _id: string;
  username: string;
  email: string;
  profilePic?: string;
  bio?: string;
  interests?: string[];
};

export type JwtUser = {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
};
