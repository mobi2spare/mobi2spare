import express from "express";
export const authRouter = express.Router();
import {signUp, signIn } from "../controllers/users.js";
import {
  validateSignUpRequest,
  validateSignInRequest,
} from "../validators/auth.js";

authRouter.route("/signin").get([validateSignInRequest], signIn);
authRouter.route("/signup").post([validateSignUpRequest],signUp);


