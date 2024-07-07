import { StatusCodes } from "http-status-codes";
import { validationResult } from 'express-validator';

export const tryCatchController = (controller)=>async (req,res,next)=>{
    try{

        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
          }
        await controller(req, res);
    }
    catch(error){
        console.log("Error thrown in try catch",error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.INTERNAL_SERVER_ERROR.toString() });
    }
}