import express from "express";
import { requestValidator } from "../middleware/auth.js";
import { sanitizeReqParams } from "../middleware/sanitizedbinputs.js";
import { verifyAndGetUserRoles } from "../validators/common_validation.js";
import { tryCatchController } from "../utils/tryCatch.js"
import { approveTemporaryProductRequest } from "../controllers/admin.js";
import { validateAddListingRequest } from "../validators/products.js";
export const adminRouter = express.Router();


// add user role for admin.
// approve product request for req id
adminRouter.route("/products/approve/:id").post(requestValidator,verifyAndGetUserRoles,[validateAddListingRequest],sanitizeReqParams,tryCatchController(approveTemporaryProductRequest));

// reject product request for req id - ONLY allowed if not already approved


// get list of all product requests with status - paginated