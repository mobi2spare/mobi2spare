import { StatusCodes } from "http-status-codes";


export const uploadProductImages  = async (req,res) => {
    if (req.files) {
        const uploadedFiles = req.files;

        if (!uploadedFiles) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'No files uploaded' });
        }
       const paths = uploadedFiles.map((file) => file.path);
       return res.status(StatusCodes.OK).json({
           success: true,
            'files': `${paths}`,
           message: `Successfully uploaded files` 
       });
   } else {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'No file uploaded' });
}
}

export const uploadCategoryImage = async (req, res) => {

    if (req.file) {
         const uploadedFiles = req.files;
        // const filename = req.file.filename;
        const path = req.file.path;
        // const mimetype = req.file.mimetype;
        return res.status(StatusCodes.OK).json({
            success: true,
            path: {
                'key': `${path}`
            },
            message: "Success, Image uploaded!",
        });
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'No file uploaded' });
    }

}