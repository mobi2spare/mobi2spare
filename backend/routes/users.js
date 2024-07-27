import express from "express";
import { requestValidator } from "../middleware/auth.js";
import { verifyAndGetUserRoles,isAdmin } from "../validators/common_validation.js";
export const userRouter = express.Router();
import {editUser,getAll,getUser} from "../controllers/users.js";
//const { auth } = require("../middleware/auth");
userRouter.route("/:id").get(requestValidator,verifyAndGetUserRoles,isAdmin,getUser);
userRouter.route("/:id").put(requestValidator,verifyAndGetUserRoles,isAdmin,editUser);
userRouter.route("/").get(requestValidator,verifyAndGetUserRoles,isAdmin,getAll);
// router.route("/:id/kyc-document").post(auth(["admin", "user"]), uploadKycDoc);
// router.route("/:id/kyc-self").post(auth(["admin", "user"]), uploadKycSelf);
// router.route("/:id/kyc-store").post(auth(["admin", "user"]), uploadKycStore);

