//file name: user.controllers.js
//Design the functionality 

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";




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

export { registerUser }



























































































































































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