import express from "express";
export const cartRouter = express.Router();
import {addItemToCart,getItemsFromCartForCartId, updateCartQuantity } from "../controllers/cart.js";
import { tryCatchController } from "../utils/tryCatch.js"
import { requestValidator } from "../middleware/auth.js";
import { verifyAndGetUserRoles } from "../validators/common_validation.js";
import {
  validateAddToCartRequest,
  updateCartQuantityRequest
} from "../validators/cart.js";

cartRouter.route("/").post(requestValidator,verifyAndGetUserRoles,[validateAddToCartRequest],tryCatchController(addItemToCart));
cartRouter.route("/").patch(requestValidator,verifyAndGetUserRoles,[updateCartQuantityRequest],tryCatchController(updateCartQuantity));
// // cartRouter.route("/:id").put(requestValidator,verifyAndGetUserRoles,[validateAddCategoryRequest],updateCart);
// // cartRouter.route("/:id").delete(requestValidator,verifyAndGetUserRoles,deleteCategory);
cartRouter.route("/:id").get(requestValidator,verifyAndGetUserRoles,tryCatchController(getItemsFromCartForCartId));



