import express from "express";
export const cartRouter = express.Router();
import {addItemToCart,getAllItemsInCartForUser,removeItemFromCart } from "../controllers/cart.js";

import {
    validateAddCategoryRequest
  } from "../validators/category.js";
import { requestValidator } from "../middleware/auth.js";
import { verifyAndGetUserRoles } from "../validators/common_validation.js";

cartRouter.route("/:id").post(requestValidator,verifyAndGetUserRoles,[],addItemToCart);
cartRouter.route("/:id").patch(requestValidator,verifyAndGetUserRoles,[],removeItemFromCart);
// cartRouter.route("/:id").put(requestValidator,verifyAndGetUserRoles,[validateAddCategoryRequest],updateCart);
// cartRouter.route("/:id").delete(requestValidator,verifyAndGetUserRoles,deleteCategory);
cartRouter.route("/:id").get(requestValidator,verifyAndGetUserRoles,getAllItemsInCartForUser);



