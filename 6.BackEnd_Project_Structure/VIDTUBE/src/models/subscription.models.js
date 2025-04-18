/*
  _id string pk
  subscriber ObjectId user
  channel Objectid user
  createdAt Date
  updatedAt Date
*/


import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
    {
        subscriber: {
            type: Schema.Types.ObjectId, //one WHO is Subscribing.
            ref: "User",
        },

        channel: {
            type: Schema.Types.ObjectId, // ONE being subscribed to.
            ref: "User",
        },
    },

    { timestamps: true }
);



export const Subscription = mongoose.model('Subscription', subscriptionSchema)