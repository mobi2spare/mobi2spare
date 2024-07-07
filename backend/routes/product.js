import express from "express";
export const productRouter = express.Router();
import {addProductForSeller,createProductRequests,deleteProductForSeller,updateProductForSeller,getAllProductsForCategory,getAllProducts,uploadProductImage,updateProductWithImage,getInfoForProduct, updateProductRequestWithImage } from "../controllers/products_listing.js";
import { upload } from "../constants/constants.js";
// const { auth, isRequestValidated } = require("../middleware/auth");
import {
    validateAddListingRequest,
    validateAddBuyerRequest
  } from "../validators/products.js";
import { requestValidator } from "../middleware/auth.js";
import { sanitizeReqParams } from "../middleware/sanitizedbinputs.js";
import { verifyAndGetUserRoles } from "../validators/common_validation.js";
import { tryCatchController } from "../utils/tryCatch.js"

// Buyer
productRouter.route("/request").post(requestValidator,verifyAndGetUserRoles,[validateAddBuyerRequest],tryCatchController(createProductRequests));
productRouter.route('/request/:id/').patch(requestValidator,verifyAndGetUserRoles,tryCatchController(updateProductRequestWithImage));

// Seller
productRouter.route("/").post(requestValidator,verifyAndGetUserRoles,[validateAddListingRequest],sanitizeReqParams,tryCatchController(addProductForSeller));
productRouter.route("/:id").put(requestValidator,verifyAndGetUserRoles,[validateAddListingRequest],tryCatchController(updateProductForSeller));
productRouter.route("/:id").delete(requestValidator,verifyAndGetUserRoles,deleteProductForSeller);
productRouter.route('/upload/:uid/').post(requestValidator,verifyAndGetUserRoles,upload.array('file'),uploadProductImage);
productRouter.route('/:id/').patch(requestValidator,verifyAndGetUserRoles,tryCatchController(updateProductWithImage));
productRouter.route("/").get(requestValidator,verifyAndGetUserRoles,getAllProducts);
productRouter.route("/:id").get(requestValidator,verifyAndGetUserRoles,tryCatchController(getAllProductsForCategory));
productRouter.route("/:pid").get(requestValidator,verifyAndGetUserRoles,getInfoForProduct);
// productRouter.route("/:pid").get(requestValidator,verifyAndGetUserRoles,getInfoForProduct);

//admin protected





