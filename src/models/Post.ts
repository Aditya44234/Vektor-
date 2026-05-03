import { Schema, models, model } from "mongoose";
import "./User"
const PostSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        content: {
            type: String,
            required: true,
            maxLength: 200,
        },

        imageUrl: {
            type: String,
            default: "",
        },
        videoUrl: {
            type: String,
            default: "",
        },

        category: {
            type: String,
            default: "general",
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        piss: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

export const Post = models.Post || model("Post", PostSchema);
