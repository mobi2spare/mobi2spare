import express from "express";
export const productRouter = express.Router();
import {addProductForSeller,deleteProductForSeller,updateProductForSeller,getAllProducts,uploadProductImage } from "../controllers/products_listing.js";
import { upload } from "../constants/constants.js";
// const { auth, isRequestValidated } = require("../middleware/auth");
import {
    validateAddListingRequest
  } from "../validators/products.js";
import { requestValidator } from "../middleware/auth.js";
import { verifyAndGetUserRoles } from "../validators/common_validation.js";

productRouter.route("/").post(requestValidator,verifyAndGetUserRoles,[validateAddListingRequest],addProductForSeller);
productRouter.route("/:id").put(requestValidator,verifyAndGetUserRoles,[validateAddListingRequest],updateProductForSeller);
productRouter.route("/:id").delete(requestValidator,verifyAndGetUserRoles,deleteProductForSeller);
productRouter.route('/upload/:uid/:pid').post(requestValidator,verifyAndGetUserRoles,upload.single('file'),uploadProductImage);
productRouter.route("/").get(requestValidator,verifyAndGetUserRoles,getAllProducts);



