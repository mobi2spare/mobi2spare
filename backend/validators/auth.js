import { check } from "express-validator";
import { validationMessages } from "../constants/constants.js";
export const validateSignUpRequest = [
  check("fullName").notEmpty().withMessage(validationMessages.USERNAME_REQUIRED_MESSAGE),
  check("phoneNumber").notEmpty().withMessage(validationMessages.PHONE_REQUIRED_MESSAGE),
  check("password")
    .isLength({ min: 6 })
    .withMessage(validationMessages.PASSWORD_REQUIRED_MESSAGE),
];

export const validateSignInRequest = [
  check("phoneNumber").notEmpty().withMessage(validationMessages.PHONE_REQUIRED_MESSAGE),
  check("password")
    .isLength({ min: 6 })
    .withMessage(validationMessages.PASSWORD_REQUIRED_MESSAGE),
];

