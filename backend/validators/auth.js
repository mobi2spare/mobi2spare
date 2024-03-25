import { check } from "express-validator";
import { validationMessages } from "../constants/constants.js";
export const validateSignUpRequest = [
  check("username").notEmpty().withMessage(validationMessages.USERNAME_REQUIRED_MESSAGE),
  check("phone").notEmpty().withMessage(validationMessages.PHONE_REQUIRED_MESSAGE),
  check("password")
    .isLength({ min: 6 })
    .withMessage(validationMessages.PASSWORD_REQUIRED_MESSAGE),
];

export const validateSignInRequest = [
  check("phone").notEmpty().withMessage(validationMessages.PHONE_REQUIRED_MESSAGE),
  check("password")
    .isLength({ min: 6 })
    .withMessage(validationMessages.PASSWORD_REQUIRED_MESSAGE),
];

