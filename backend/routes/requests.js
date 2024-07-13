import express from "express";
import {fetchRequestedFeedForUser,deleteRequestForUser } from "../controllers/requests.js";
import { verifyAndGetUserRoles } from "../validators/common_validation.js";
import { tryCatchController } from "../utils/tryCatch.js"
import { requestValidator } from "../middleware/auth.js";
export const requestRouter = express.Router();

requestRouter.route("/:userId").get(requestValidator,verifyAndGetUserRoles,tryCatchController(fetchRequestedFeedForUser));
requestRouter.route("/:userId").delete(requestValidator,verifyAndGetUserRoles,tryCatchController(deleteRequestForUser));
