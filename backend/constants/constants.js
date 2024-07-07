import multer from "multer";
import dotenv from 'dotenv';
dotenv.config();
import * as path from 'path';
import * as fs from 'fs';
import { dirname } from 'path';

export const ROLES = {
    Admin: 'Admin',
    DeliveryPartner: 'DeliveryPartner',
    GeneralUser: 'GeneralUser' // Buyer and Seller Both.
}
export const validationMessages = {
    PASSWORD_REQUIRED_MESSAGE: 'Password must be at least 6 characters long',
    PHONE_REQUIRED_MESSAGE: 'Valid Contact Number is required',
    USERNAME_REQUIRED_MESSAGE: 'A Valid Name is required',
    ADHAR_NUMBER_INVALID_MESSAGE: 'A valid adhar number is required'
}

export const PRODUCT_REQUEST_STATUS = {
    APPROVED: "Approved",
    PENDING : "Pending",
    REJECTED: "Rejected"

}

// export const uploadProductImages = multer({

//     storage : multer.diskStorage({

//         destination
//     })
// })

export const upload = multer({
    limits: { fileSize: 1200000 },

    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let userId;
            let uploadPath;
            let subFolder;
            if (req.params['uid']){
                subFolder = 'product';
                userId = req.params['uid'];
            }
            else if (req.params['categoryId'])
            {
                subFolder = 'category';
            }
            if (userId != undefined){
                // uploads\\userId\\product\\1716034174651-672853170.jpeg
                uploadPath = path.join(process.env.FILE_UPLOAD_PATH,subFolder);
            }
            else{
                // uploads\\category\\categoryid\\1716034174651-672853170.jpeg
                uploadPath = path.join(process.env.FILE_UPLOAD_PATH,subFolder);
            }
            
            fs.mkdirSync(uploadPath, { recursive: true }); // Create directory if it doesn't exist
            cb(null, uploadPath);
        },

        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const ext = file.originalname.split('.').pop();
            cb(null, uniqueSuffix + '.' + ext);
        },

    }),


    fileFilter: function (req, file, cb) {
        // Set the filetypes, it is optional
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);

        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );

        console.log("extname", extname);
        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("File not supported, Only JPEG, JPG and PNG file supported!");
    },
}); 
