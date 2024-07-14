import jwt from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import dotenv from 'dotenv';
dotenv.config();

const defaultSecret = 'e6a7b892fecc467a9a2b573d7e649f82cbb0dcd34d8e4549cf89a2d5af79d239';
const secret = process.env.JWT_SECRET || defaultSecret;

export function verifyAndGetUserRoles(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedAccessToken = jwt.verify(token, secret);
        if (!decodedAccessToken.role) {
            return res.status(StatusCodes.FORBIDDEN).json({ message: 'Invalid User Access' });
        }
        req.userRoles = decodedAccessToken.role; // Store roles in request object
        req.userId = decodedAccessToken.userId; // Store user ID in request object
        next();
    } catch (err) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: 'Invalid token' });
    }
}

export function validateErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Request failed. Please try again.' });
    }
    next();
}

function isAdmin(user) {
    // Replace this with your logic to check if the user is an admin
    // This could involve checking a user role in the database or a flag in the user object
    return user.role === 'admin';
}
