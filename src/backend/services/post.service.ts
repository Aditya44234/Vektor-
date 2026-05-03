import { Post } from "@/src/models/Post"

export async function createPost(data: {
    userId: string,
    content: string,
    imageUrl?: string,
    videoUrl?: string,
}) {
    const { userId, content, imageUrl, videoUrl } = data;

    if (!content) {
        throw new Error("Content is required");
    }

    const post = await Post.create({
        userId,
        content,
        imageUrl: imageUrl || "",
        videoUrl: videoUrl || "",
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


export async function getPostByUserId(userId: string) {
    const trimmedUserId = userId.trim();


    if (!trimmedUserId) {
        throw new Error("User id is required");
    }

    const posts = await Post.find({ userId: trimmedUserId })
        .sort({ createdAt: -1 })
        .populate("userId", "username profilePic")
        .select("-__v");

    return posts;
}