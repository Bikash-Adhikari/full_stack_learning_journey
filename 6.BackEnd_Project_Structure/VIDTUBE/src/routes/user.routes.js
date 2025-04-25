
import { Router } from "express";
import { registerUser } from "../controllers/user.contorllers.js";
import { upload } from "../middlewares/multer.middlewares.js";


const router = Router();

//where you want to serve this
router.route("/Register").post(
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
