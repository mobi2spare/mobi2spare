import { StatusCodes } from "http-status-codes";

const checkValidationErrors = ()=>{

}


export const uploadImage = async (req, res) => {

    if (req.file) {
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