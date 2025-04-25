import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";


//Handle the error middlewares
const errorHandler = (err, req, res, next) => {
    let error = err

    //1. verify the error instance
    if (!(error instanceof ApiError)) {

        //1.1 Manipulate statusCode
        const statusCode = error.statusCode || error instanceof mongoose.Error ? 400 : 500


        //1.2 Manipulate message
        const message = error.message || "Something went wrong!"

        //1.3 Manipulate Error
        error = new ApiError(statusCode, message, error?.errors || [], err.stack)
    }


    //2. create a error-response
    const response = {
        ...error,
        message: error.message,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {})
    }

    //3. return the response 
    return res
        .status(error.statusCode)
        .json(response)

}


export { errorHandler }



