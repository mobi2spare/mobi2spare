import express from "express";
export const categoryRouter = express.Router();
import {addCategory,getAllCategories,updateCategory,deleteCategory, updateCategoryWithImage, uploadCategoryImage,getInfoForCategory } from "../controllers/category.js";
import { upload } from "../constants/constants.js";
// const { auth, isRequestValidated } = require("../middleware/auth");
import {
    validateAddCategoryRequest
  } from "../validators/category.js";
import { requestValidator } from "../middleware/auth.js";
import { verifyAndGetUserRoles } from "../validators/common_validation.js";
import { tryCatchController } from "../utils/tryCatch.js"

categoryRouter.route("/").post(requestValidator,verifyAndGetUserRoles,[validateAddCategoryRequest],tryCatchController(addCategory));
categoryRouter.route("/:id").put(requestValidator,verifyAndGetUserRoles,[validateAddCategoryRequest],tryCatchController(updateCategory));
categoryRouter.route("/:id").delete(requestValidator,verifyAndGetUserRoles,tryCatchController(deleteCategory));
categoryRouter.route("/").get(requestValidator,verifyAndGetUserRoles,tryCatchController(getAllCategories));
categoryRouter.route("/:id").get(requestValidator,verifyAndGetUserRoles,getInfoForCategory);
categoryRouter.route('/:id/').patch(requestValidator,verifyAndGetUserRoles,updateCategoryWithImage);
categoryRouter.route('/upload/:categoryId').post(requestValidator,verifyAndGetUserRoles,upload.single('file'),uploadCategoryImage);


