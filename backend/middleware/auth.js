import pkg from 'jsonwebtoken';
import { expressjwt as jwtFunction } from "express-jwt";
import { StatusCodes } from "http-status-codes";
import dotenv from 'dotenv';
dotenv.config();

export const requestValidator = jwtFunction({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  credentialsRequired: true, // Ensure a token is present
  onError: (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }
    next(err);
    
  }

 
});
 