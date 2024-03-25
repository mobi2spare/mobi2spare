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
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role == undefined) {
            return res.status(StatusCodes.FORBIDDEN).json({ message: 'Invalid User Access' });
        }
        req.userRoles = decoded.roles; // Store roles in request object
        next();
    } catch (err) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: 'Invalid token' });
    }
}

export function validateErrors (req){
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
}