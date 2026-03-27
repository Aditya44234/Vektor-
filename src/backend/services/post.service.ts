import { Post } from "@/src/models/Post"

export async function createPost(data: {
    userId: string,
    content: string,
    imageUrl?: string;
}) {
    const { userId, content, imageUrl } = data;

    if (!content) {
        throw new Error("Content is required");
    }

    const post = await Post.create({
        userId,
        content,
        imageUrl: imageUrl || "",
    })

    return post;
}

export async function getFeedPosts() {
    const posts = await Post.find()
    .sort({ createdAt: -1 })
    .limit(20)
    .populate("userId", "username profilePic")
    .select("-__v");
    return posts
}