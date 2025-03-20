import { Schema, model } from 'mongoose';

const blogSchema = new Schema({
    title: {
        type: String,
        requried: true
    },
    content: {
        type: String,
        requried: true
    },
    coverImageURL: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true });

export const Blog = model("blog", blogSchema);
