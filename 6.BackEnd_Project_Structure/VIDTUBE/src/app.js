import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";


const app = express();

// use cors middleware
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
)



//use common express middleware
app.use(express.json({ limit: '16kb' })) // limit the data
app.use(express.urlencoded({ extended: true, limit: '16kb' })) //only parse url-encoded bodies
app.use(express.static('public')) //serve static files

app.use(cookieParser())




//import routes ---------------------------------------------------------------------------------------
import heathcheckRouter from "./routes/healthcheck.routes.js"
import userRouter from "./routes/user.routes.js"
import { errorHandler } from './middlewares/error.middleware.js';

//create routes: As another middleware -----------------------------------------------------------------
app.use("/api/v1/healthcheck", heathcheckRouter)
app.use("/api/v1/users", userRouter)
app.use(errorHandler)





export { app };






