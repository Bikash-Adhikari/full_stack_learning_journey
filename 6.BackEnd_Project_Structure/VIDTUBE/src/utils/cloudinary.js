import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

//Configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});






//How to upload files in the cloudinary (Upload function)
const uploadOnCloudinary = async (localFilePath) => {
    try {

        if (!localFilePath) return null

        const response = await cloudinary.uploader.upload( //-----how to upload files in the cloudinary
            localFilePath, { resource_type: "auto" }
        )
        console.log("File uploaded on cloudinary. File src: " + response.url)

        //once the file is uploaded, we would like to delete it from our server
        fs.unlinkSync(localFilePath)
        return response;


    } catch (error) {
        fs.unlinkSync(localFilePath)   //if any error==> unlink localFilePath and return null
        return null
    };
};


export { uploadOnCloudinary }






