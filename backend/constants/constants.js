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
    USERNAME_REQUIRED_MESSAGE: 'A Valid Name is required'
}




export const upload = multer({
    limits: { fileSize: 1200000 },

    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let userId;
            let uploadPath;
            let subFolder;
            if (req.params['pid']){
                subFolder = 'product';
                userId = req.params['uid'];
            }
            else if (req.params['categoryId'])
            {
                subFolder = 'category';
            }
            let subFolderId = req.params['pid'] || req.params['categoryId'];
            if (userId != undefined){
                uploadPath = path.join(process.env.FILE_UPLOAD_PATH, userId,subFolder,subFolderId);
            }
            else{
                uploadPath = path.join(process.env.FILE_UPLOAD_PATH,subFolder,subFolderId);
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
