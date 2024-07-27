import express from "express";
export const ordersRouter = express.Router();
import { requestValidator } from "../middleware/auth.js";
import { sanitizeReqParams } from "../middleware/sanitizedbinputs.js";
import { verifyAndGetUserRoles } from "../validators/common_validation.js";
import { tryCatchController } from "../utils/tryCatch.js"

// ordersRouter.route("/").post(requestValidator,verifyAndGetUserRoles,[],tryCatchController(getOrdersForUser));
