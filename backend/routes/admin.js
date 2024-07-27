import express from "express";
import { requestValidator } from "../middleware/auth.js";
import { sanitizeReqParams } from "../middleware/sanitizedbinputs.js";
import { verifyAndGetUserRoles,isAdmin } from "../validators/common_validation.js";
import { tryCatchController } from "../utils/tryCatch.js"
import { denyTemporaryProductRequest,approveTemporaryProductRequest ,getAllTempRequests} from "../controllers/admin.js";
import { validateAddListingRequest } from "../validators/products.js";
export const adminRouter = express.Router();


// add user role for admin.
// approve product request for req id
adminRouter.route("/products/deny/:id").post(requestValidator,verifyAndGetUserRoles,isAdmin, denyTemporaryProductRequest);
adminRouter.route("/products/approve/:id").post(requestValidator,verifyAndGetUserRoles,[validateAddListingRequest],isAdmin,sanitizeReqParams,tryCatchController(approveTemporaryProductRequest));
adminRouter.route("/getempreq").get(requestValidator,verifyAndGetUserRoles,isAdmin, getAllTempRequests);
// reject product request for req id - ONLY allowed if not already approved


// get list of all product requests with status - paginated