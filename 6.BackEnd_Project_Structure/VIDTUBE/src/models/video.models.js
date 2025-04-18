/*
  videoFile string
  thumbnail string
  owner ObjectId users
  title string
  description string
  duration number
  views number
  isPublished boolean
  createdAt Date
  updatedAt Date
*/


import mongoose, { Schema } from "mongoose";

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, //cloudinary url
            requird: true,
        },

        thumbnail: {
            type: String, //cloudinary url
            requird: true,
        },

        owner: { //since it is only owner, it does not required array
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        title: {
            type: String,
            requird: true,
        },

        description: {
            type: String,
            requird: true,
        },

        views: {
            type: Number,
            required: true,
        },

        duration: {
            type: Number,
            default: 0,
        },

        isPublish: {
            type: Boolean,
            default: true,
        }
    },

    { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate); //now we will be able to write complex queries

export const Video = mongoose.model('Video', videoSchema)


