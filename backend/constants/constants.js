import multer from "multer";
import dotenv from 'dotenv';
dotenv.config();
import * as path from 'path';
import * as fs from 'fs';

const FILE_UPLOAD_PATH = process.env.FILE_UPLOAD_PATH;

export const ROLES = {
    Admin: 'Admin',
    DeliveryPartner: 'DeliveryPartner',
    GeneralUser: 'GeneralUser' // Buyer and Seller Both.
};

export const validationMessages = {
    PASSWORD_REQUIRED_MESSAGE: 'Password must be at least 6 characters long',
    PHONE_REQUIRED_MESSAGE: 'Valid Contact Number is required',
    USERNAME_REQUIRED_MESSAGE: 'A Valid Name is required',
    ADHAR_NUMBER_INVALID_MESSAGE: 'A valid adhar number is required'
};

export const PRODUCT_REQUEST_STATUS = {
    APPROVED: "Approved",
    PENDING : "Pending",
    REJECTED: "Rejected"
};



export const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let subFolder;
            let uploadPath;

            if (req.params['uid']) {
                subFolder = 'product';
                uploadPath = path.join(FILE_UPLOAD_PATH, subFolder);
            } else if (req.params['categoryId']) {
                subFolder = 'category';
                uploadPath = path.join(FILE_UPLOAD_PATH, subFolder);
            } else if (req.params['id']) {
                // Assuming 'id' parameter is for banners (video files)
                subFolder = 'banners';
                uploadPath = path.join(FILE_UPLOAD_PATH, subFolder);
            } else {
                cb('Invalid parameters');
                return;
            }
            console.log(subFolder)
            fs.mkdirSync(uploadPath, { recursive: true }); // Create directory if it doesn't exist
            cb(null, uploadPath);
        },

        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const ext = file.originalname.split('.').pop();
            cb(null, uniqueSuffix + '.' + ext);
        },
    }),

    limits: {
        fileSize: function (req, file, cb) {
            let sizeLimit;

            if (req.params['uid'] || req.params['categoryId']) {
                // Image file size limit (1.2MB)
                sizeLimit = 1200000;
            } else if (req.params['id']) {
                // Video and audio file size limit (30MB)
                sizeLimit = 30000000;
            } else {
                cb("Invalid parameters");
                return;
            }

            if (file.size <= sizeLimit) {
                cb(null, true);
            } else {
                cb(`File size exceeds the limit. Maximum size allowed is ${sizeLimit} bytes.`);
            }
        }
    },

    fileFilter: function (req, file, cb) {
        let filetypes;
    
        if (req.params['uid'] || req.params['categoryId']) {
            // Image file types
            filetypes = /jpeg|jpg|png/;
        } else if (req.params['id']) {
            // Video and audio file types
            filetypes = /mp4|mov|avi|dvd|mp3/;
        } else {
            cb("Invalid parameters");
            return;
        }
    
        // Check both mimetype and extension
        const mimetypeAccepted = filetypes.test(file.mimetype.toLowerCase());
        const extnameAccepted = filetypes.test(path.extname(file.originalname).toLowerCase());
    
        // Additional check for MP3 files
        const isMP3 = file.mimetype.toLowerCase() === 'audio/mpeg';
    
        if ((mimetypeAccepted || isMP3) && extnameAccepted) {
            return cb(null, true);
        } else {
            cb(`File type '${file.mimetype}' is not supported. Please upload files of type MP4, MOV, AVI, DVD, or MP3.`);
        }
    },
    
});



// export const upload = multer({
//     limits: { fileSize: 1200000 },

//     storage: multer.diskStorage({
//         destination: function (req, file, cb) {
//             let userId;
//             let uploadPath;
//             let subFolder;
            
//             if (req.params['uid']){
//                 subFolder = 'product';
//                 userId = req.params['uid'];
//             } else if (req.params['categoryId']) {
//                 subFolder = 'category';
//             }
            
//             if (userId !== undefined){
//                 uploadPath = path.join(FILE_UPLOAD_PATH, subFolder);
//             } else {
//                 uploadPath = path.join(FILE_UPLOAD_PATH, subFolder);
//             }
            
//             fs.mkdirSync(uploadPath, { recursive: true }); // Create directory if it doesn't exist
//             cb(null, uploadPath);
//         },

//         filename: function (req, file, cb) {
//             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//             const ext = file.originalname.split('.').pop();
//             cb(null, uniqueSuffix + '.' + ext);
//         },
//     }),

//     fileFilter: function (req, file, cb) {
//         // Set the filetypes, it is optional
//         const filetypes = /jpeg|jpg|png/;
//         const mimetype = filetypes.test(file.mimetype);

//         const extname = filetypes.test(
//             path.extname(file.originalname).toLowerCase()
//         );

//         console.log("extname", extname);
//         if (mimetype && extname) {
//             return cb(null, true);
//         }

//         cb("File not supported, Only JPEG, JPG and PNG file supported!");
//     },
// });
