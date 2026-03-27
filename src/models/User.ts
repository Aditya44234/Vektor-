import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
            maxlength: 15,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        profilePic: {
            type: String,
            default: "",
        },


        bio: {
            type: String,
            default: "",
        },
        interests: {
            type: [String],
            default: [],
        },
    },

    { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
