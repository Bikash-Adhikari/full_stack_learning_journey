/*
  _id string pk
  name string
  description string
  createdAt Date
  updatedAt Date
  videos ObjectId[] videos
  owner ObjectId
*/


import mongoose, { Schema } from "mongoose";

const playListSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        videos: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            },
        ],

        Owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    },

    { timestamps: true }
);



export const PlayList = mongoose.model('PlayList', playListSchema)