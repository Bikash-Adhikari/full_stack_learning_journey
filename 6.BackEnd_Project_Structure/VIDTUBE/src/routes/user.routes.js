import { Router } from "express";
import { registerUser, logoutUser, loginUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, getUserChannelProfile, updateAccountDetails, updateUserAvtar, updateUserCoverImage, getWatchHistory } from "../controllers/user.contorllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";


const router = Router();


//unsecured routes----------------------------------------------------------------------
//where you want to serve this
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)


router.route("/login").post(loginUser)
router.route("/refresh-token").post(refreshAccessToken)



//secured routes-------------------------------------------------------------------------
//Which route you want to serve on
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvtar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)
router.route("/history").get(verifyJWT, getWatchHistory)



export default router





























































































































/*


//Controllers ==> Routes ==> app.js

import { Router } from "express";
import { registerUser } from "../controllers/user.contorllers.js";
import upload from "../middlewares/multer.middlewares.js";


const router = Router();
router.route("/register").post(
    upload.fields([    // 2 objects{} inside an array []
        {
            name: "avatar",
            maxCount: 1
        }, {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)

export default router



*/
