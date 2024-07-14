import pkg from 'jsonwebtoken';
import { expressjwt as jwtFunction } from "express-jwt";
import { StatusCodes } from "http-status-codes";
import dotenv from 'dotenv';
dotenv.config();
const defaultSecret = 'e6a7b892fecc467a9a2b573d7e649f82cbb0dcd34d8e4549cf89a2d5af79d239';
const secret = process.env.JWT_SECRET || defaultSecret;
export const requestValidator = jwtFunction({
  secret: secret,
  algorithms: ['HS256'],
  credentialsRequired: true, // Ensure a token is present
  onError: (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }
    next(err);
    
  }

 
});
 