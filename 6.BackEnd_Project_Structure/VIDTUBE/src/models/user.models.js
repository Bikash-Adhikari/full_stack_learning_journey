/*
  _id string pk
  watchHistory ObjectId[] videos
  username string
  email string
  fullName string
  avatar string
  coverImage string
  password string
  refreshToken string
  createdAt Date
  updatedAt Date
*/


import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },

        avatar: {
            type: String, //Cloudinary URL
            required: true
        },

        coverImage: {
            type: String, //Cloudinary URL
        },

        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],

        password: {
            type: String,
            required: [true, "password is required"]
        },

        refreshToken: {
            type: String
        }
    },
    { timestamps: true }
);





//use the hook(middleware) to encrypt the passowrd [clear-text PW is not good]
// to encrypt password => use a library ==> 'bcrypt' : https://www.npmjs.com/package/bcrypt 

userSchema.pre("save", async function (next) {

    if (!this.modified("password")) return next() //if the modify field is not PASSWORD ==> return
    this.password = bcrypt.hash(this.password, 10)

    next()
})

//lets compare the user-input password and database password in encrypted form
userSchema.methods.isPasswordCorrect = async function (passowrd) {
    return await bcrypt.compare(passowrd, this.password)
}


//Making ensure whether you are signed up or logged in 
//When user successfully logged in, we want to generate ACCESS TOKEN & REFRESH TOKEN

userSchema.methods.generateAccessToken = function () {
    //short lived access Token
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
}

// When user successfully logged in, we want to generate REFRESH TOKEN as same as ACCESS TOKEN
userSchema.methods.generateRefreshToken = function () {

    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
}




export const user = mongoose.model('User', userSchema);

//mongoose says ==> Hey mongoose I want build a model (a new structure) in my database, that document will be called as 'User' and the schema structure to be followed is 'userSchema'




