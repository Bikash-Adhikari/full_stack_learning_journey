import dotenv from 'dotenv';
import { app } from './app.js';
import connectDB from './db/index.js';


dotenv.config({  //config
    path: './.env'
})

const PORT = process.env.PORT || 8001;  //modify port

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening at the port: ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("MongoDB connection error!", err);
    })










