//file name: user.controllers.js
//Design the functionality 

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";




//Helper function for login purpose
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new ApiError(404, "User not found.")
        }

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()


        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh tokens.")
    }
}



const registerUser = asyncHandler(async (req, res) => {


    //1. accepting the data from user
    const { fullname, username, email, password } = req.body



    //2. validate the data ==> [].some()  ==> Either of them should not be blank
    if (
        [fullname, username, email, password].some((fields) => fields?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")

    }



    //3. check whether "User" exist or not ==> User.findOne()
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exited.")
    }



    //4. Handle the image-files ==> 
    // 4.1. access files with path & check in our database
    const avatarLocalPath = req.files?.avatar?.[0]?.path
    const coverLocalpath = req.files?.coverImage?.[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }

    // 4.2 upload/send image-files on cloudinary
    /*
    const avatar = await uploadOnCloudinary(avatarLocalPath)

    let coverImage = "";
    if (coverLocalpath) {
        coverImage = await uploadOnCloudinary(coverLocalPath)
    }
    */

    //now refactoring ==> 4.2 part: upload on cloudinary ==> using try-catch
    let avatar;

    try {
        avatar = await uploadOnCloudinary(avatarLocalPath)
        console.log("Uploaded avatar", avatar)

    } catch (error) {
        console.log("Error uploading avatar", error)
        throw new ApiError(500, "Failed to upload avatar")
    }


    let coverImage;
    try {
        coverImage = await uploadOnCloudinary(coverLocalpath)
        console.log("Uploaded coverImage", coverImage)

    } catch (error) {
        console.log("Error uploading coverImage", error)
        throw new ApiError(500, "Failed to upload coverImage")
    }


    try {

        //5. Create a user
        const user = await User.create({
            fullname,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            username: username.toLowerCase(),
            email,
            password
        })


        //6. Check whether user created or not ==>  User.findById().select()
        const createdUser = await User.findById(user._id).select("-password -RefreshToken")


        //7. If not created ==> send Error
        if (!createdUser) {
            throw new ApiError(500, "something went wrong while registering a user")
        }


        //8. If created ==> send response to frontEnd
        return res
            .status(201)
            .json(new ApiResponse(201, createdUser, "User registered successfully."))

    } catch (error) {

        console.log("User creation failed")

        if (avatar) {
            await deleteFromCloudinary(avatar.public_id)
        }

        if (coverImage) {
            await deleteFromCloudinary(coverImage.public_id)
        }


        throw new ApiError(500, "Something went wrong while registering a user and images were deleted")
    }
});



//login function 
const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body

    if (!email && !username) {
        throw new ApiError(400, "email or username is required.")
    }


    const user = await User.findOne({
        $or: [{ username }, { email }]
    })


    if (!user) {
        throw new ApiError(404, "User not found.")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials.")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)


    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const options = {
        httpOnly: true,
        secure: true
        // secure: process.env.NODE_ENV === "production",
    }


    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(
            200,
            { user: loggedInUser, accessToken, refreshToken },
            "User logged in successfully."
        ))

});




//logout : refresh token in our database ==> Remove  that from database by [backend part]
const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(  //not remove all data, but update

        req.user._id,

        {
            $set: { refreshToken: undefined }, //set new field
        },

        { new: true }  //new return the fresh information
    )

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully."))
});




//refresh the accessToken
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Refresh Token is required.")
    }

    try {
        const decodedToken = jwt.verify( //decode received token
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id) // deine user with decodedToken's id: find

        if (!user) {
            throw new ApiError(404, "Invalid refresh token.")
        }

        if (incomingRefreshToken !== user?.refreshToken) { //verify token with database copy
            throw new ApiError(401, "Invalid refresh token.")
        }

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        }


        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id)


        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(
                200,
                { accessToken, refreshToken: newRefreshToken },
                "Access Token refreshed successfully"
            ))
    } catch (error) {
        throw new ApiError(500, "Something went wrong while refreshing access token.")
    }
});




// CRUD operation in MERN Backend

// Change Password - CRUD
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user?._id)

    const isPasswordValid = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordValid) {
        throw new ApiError(401, "Old password is incorrect.")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200), {}, "Password Changed Successfully.")
})



//Get Current User - CRUD
const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "Current users details."))
})



//Update Account Details - CRUD
const updateAccountDetails = asyncHandler(async (req, res) => {

    const { fullname, email } = req.body

    if (!fullname || !email) {
        throw new ApiError(400, "Fullname and Email are required.")
    }

    const user = await findByIdAndUpdate(
        req.body?._id,
        {
            $set: { fullname, email: email }
        },
        { new: true }

    ).select("-password -refreshToken")

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully."))
})



//Update Avatar - CRUD
const updateUserAvtar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path
    if (!avatarLocalPath) {
        throw new ApiError(400, "File is required.")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if (!avatar.url) {
        throw new ApiError(500, "Something went wrong while uploading avatar.")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: { avatar: avatar.url }
        },
        { new: true }

    ).select("-password -refreshToken")

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Avatar updated successfully."))
})



//Updte Cover Image - CRUD
const updateUserCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path
    if (!coverImageLocalPath) {
        throw new ApiError(400, "File is required.")
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if (!coverImage.url) {
        throw new ApiError(500, "Something went wrong while uploading cover image.")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: { coverImage: coverImage.url }
        },
        { new: true }

    ).select("-password -refreshToken")

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Cover image updated successfully."))
})




// Get complex data in ==> mongoDB aggregation pipeline
const getUserChannelProfile = asyncHandler(async (req, res) => {

    const { username } = req.params   //it gets you anything from url when user is visiting
    if (!username?.trim()) {
        throw new ApiError(400, "Username is required.")
    }

    const channel = await User.aggregate(
        [
            {
                $match: {
                    username: username.toLowerCase()
                }
            },

            {   //my subscribers ------------
                $lookup: {
                    from: "subscriptions",
                    localField: "_id",
                    foreignField: "channel",
                    as: "subscribers"
                }
            },

            {   // I subscribed to ----------
                $lookup: {
                    from: "subscriptions",
                    localField: "_id",
                    foreignField: "subscriber",
                    as: "subscribedTo"
                }
            },

            {   //present the above info -------
                $addFields: {
                    subscribersCount: {
                        $size: "$subscribers"
                    },

                    channelSubscribedToCount: {
                        $size: "$subscribedTo"
                    },

                    isSubscribed: {
                        $cond: {
                            if: { $in: [req.user?._id, "$subscribers.subscriber"] },
                            then: true,
                            else: false
                        }
                    }
                }
            },

            {   //Project only the necessary data -----
                $project: {
                    fullname: 1,
                    username: 1,
                    avatar: 1,
                    subscribersCount: 1,
                    channelSubscribedToCount: 1,
                    isSubscribed: 1,
                    coverImage: 1,
                    email: 1
                }
            }
        ]
    )


    //check if there is no channel length
    if (!channel?.length) {
        throw new ApiError(404, "Channel not found.")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, channel[0], "Channel profile fetched successfully."))
})



const getWatchHistory = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user?._id)
            }
        },

        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullname: 1,
                                        username: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },

                    {
                        $addFields: {
                            owner: {
                                $first: "$owner"
                            }
                        }
                    }
                ]
            }
        },
    ])


    return res
        .status(200)
        .json(new ApiResponse(200, user[0]?.watchHistory, "Wacth history fetched successfully."))
})




export {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvtar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
}



























































































































































/*


//Controllers ==> Routes ==> app.js

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
    //write logic
    const { fullName, email, username, password } = req.body


    //validation
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All filds are required")
    }


    //Check: ask whether user exits or not
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already existed")
    }


    // handle the images-files
    //1. excess files at first
    const avatarLocalPath = req.files?.avatar[0].path
    const coverLocalPath = req.files?.coverImage[0].path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }

    //2. upload/send images-files on Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)

    let coverImage = ""
    if (coverLocalPath) {
        coverImage = await uploadOnCloudinary(coverImage)
    }

    //Now construct an User
    const user = await User.creat({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })


    //Now verify whether user is created or not
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Someting went wrong while registering a user")
    }

    //if created send response to the frontEnd
    return res
        .status(200)
        .json(new ApiResponse(200, createdUser, "User registered successfully!"))

});





export { registerUser }




*/