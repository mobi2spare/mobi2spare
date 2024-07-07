import express from "express";
export const brandRouter = express.Router();
import {addBrand,getAllBrands ,updateBrand,deleteBrand} from "../controllers/brands.js";
import {
    validateAddCategoryRequest
  } from "../validators/category.js";
import { requestValidator } from "../middleware/auth.js";
import { verifyAndGetUserRoles } from "../validators/common_validation.js";
import { tryCatchController } from "../utils/tryCatch.js"

brandRouter.route("/").post(requestValidator,verifyAndGetUserRoles,[validateAddCategoryRequest],tryCatchController(addBrand));
brandRouter.route("/:id").put(requestValidator,verifyAndGetUserRoles,[validateAddCategoryRequest],tryCatchController(updateBrand));
brandRouter.route("/:id").delete(requestValidator,verifyAndGetUserRoles,tryCatchController(deleteBrand));
brandRouter.route("/").get(requestValidator,verifyAndGetUserRoles,tryCatchController(getAllBrands));



