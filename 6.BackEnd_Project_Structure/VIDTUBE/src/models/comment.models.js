/*
_id string pk
  content string
  createdAt Date
  updatedAt Date
  video ObjectId video
  owner ObjectId user
*/


import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },

        video: {
            type: Schema.Types.ObjectId,
            ref: "Video",
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },

    { timestamps: true }
);



export const Comment = mongoose.model('Comment', commentSchema)