import multer from "multer";


//Allow the disk storage-------------------------------------------------------------------------------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')     //keeping everyting into the temporary storage inside public
    },

    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})

export const upload = multer({ storage })  //export the upload setting
//next step is upload the files in Cloudinary


/*
First ==> We have save files on our SERVER
Then ==> Send them to the CLOUDINARY
*/








