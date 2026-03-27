import { Post } from "@/src/models/Post"

export async function toggleReaction(data: {
    postId: string;
    userId: string;
    type: "like" | "piss";
}) {
    const { postId, userId, type } = data;
    const post = await Post.findById(postId);
    if (!post) {
        throw new Error("Post now found ");
    }
    const field = type === "like" ? "likes" : "piss";

    const alreadyReacted = post[field].includes(userId);

    if (alreadyReacted) {
        post[field] = post[field].filter(
            (id: { toString: () => string }) => id.toString() !== userId
        );
    } else {
        post[field].push(userId)
    }
    await post.save();
    return post
}
