/*
  _id string pk
  comment Object comments
  createdAt Date
  updatedAt Date
  video Objectid videos
  likedBy ObjectId users
  tweet ObjectId tweets
*/


import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
    {
        comments: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },

        video: {
            type: Schema.Types.ObjectId,
            ref: "Video",
        },

        tweet: {
            type: Schema.Types.ObjectId,
            ref: "Tweet",
        },

        likedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    },

    { timestamps: true }
);



export const Likes = mongoose.model('Likes', likeSchema)