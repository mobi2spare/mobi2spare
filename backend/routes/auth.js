import express from "express";
export const authRouter = express.Router();
import {signUp, signIn,generateNewAccessToken } from "../controllers/users.js";
import {generateAdharOtp,validateAdharOTP } from "../controllers/adhar.js";
import {
  validateSignUpRequest,
  validateSignInRequest,
  validateAdharOtpGenerateRequest,
  validateAdharOtpSubmitRequest
} from "../validators/auth.js";
import { tryCatchController } from "../utils/tryCatch.js";
import {isAdmin} from "../validators/common_validation.js"

authRouter.route("/signin").post([validateSignInRequest], tryCatchController(signIn));
authRouter.route("/signup").post([validateSignUpRequest],tryCatchController(signUp));
authRouter.route('/refreshToken').post(tryCatchController(generateNewAccessToken));
authRouter.route('/otp/generate').post([validateAdharOtpGenerateRequest],tryCatchController(generateAdharOtp));
authRouter.route('/otp/verify').post([validateAdharOtpSubmitRequest],tryCatchController(validateAdharOTP))
