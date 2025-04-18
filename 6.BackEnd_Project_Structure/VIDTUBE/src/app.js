import express from 'express';
import cors from 'cors';

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




//import routes ---------------------------------------------------------------------------------------
import heathcheckRouter from "./routes/healthcheck.routes.js"

//create routes: As another middleware -----------------------------------------------------------------
app.use("/api/v1/healthcheck", heathcheckRouter)





export { app };






