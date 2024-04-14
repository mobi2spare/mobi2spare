import express from "express";
export const authRouter = express.Router();
import {signUp, signIn } from "../controllers/users.js";
import {
  validateSignUpRequest,
  validateSignInRequest,
} from "../validators/auth.js";
import { generateOtp,verifyOtp } from "../controllers/otp.js";

authRouter.route("/signin").post([validateSignInRequest], signIn);
authRouter.route("/signup").post([validateSignUpRequest],signUp);
authRouter.route("/otp/generate").post(generateOtp);
authRouter.route("/otp/verify").post(verifyOtp);
// authRouter.route("/otp/resend").get([validateSignUpRequest],resendOtp);


