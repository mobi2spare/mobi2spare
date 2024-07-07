import jwt from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import dotenv from 'dotenv';
dotenv.config();

export function verifyAndGetUserRoles(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: StatusCodes.UNAUTHORIZED.toString() });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedAccessToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedAccessToken.role == undefined) {
            return res.status(StatusCodes.FORBIDDEN).json({ message: 'Invalid User Access' });
        }
        req.userRoles = decodedAccessToken.role; // Store roles in request object
        req.userId = decodedAccessToken.userId;
        console.log(req.userId);
        next();
    } catch (err) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: 'Invalid token' });
    }
}

export function validateErrors (req, res){
    const errors = validationResult(req);
    console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Request failed. Please try again.' });
  }
}

function isAdmin(user) {
  // Replace this with your logic to check if the user is an admin
  // This could involve checking a user role in the database or a flag in the user object
  return user.role === 'admin';
}