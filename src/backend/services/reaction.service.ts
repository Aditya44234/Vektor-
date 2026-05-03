import { Post } from "@/src/models/Post";

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
    const oppositeField = type === "like" ? "piss" : "likes";

    const alreadyReacted = post[field].includes(userId);

    if (alreadyReacted) {
        // Remove the reaction if already exists
        post[field] = post[field].filter(
            (id: { toString: () => string }) => id.toString() !== userId
        );
    } else {
        // Add the reaction and remove from opposite reaction
        post[field].push(userId);
        // Remove from opposite reaction type (mutually exclusive)
        post[oppositeField] = post[oppositeField].filter(
            (id: { toString: () => string }) => id.toString() !== userId
        );
    }
    await post.save();
    return post
}
