import express from "express";
export const attributeRouter = express.Router();
import {addAttribute,addAttributeValue,mapCategoryToAttributes,getAttributeValuesForCategories,getAttributeValuesbyid } from "../controllers/attributes.js";
import {
    validateAddAttributeRequest,validateAddAttributeValueRequest
  } from "../validators/attributes.js";
import { requestValidator } from "../middleware/auth.js";
import { verifyAndGetUserRoles } from "../validators/common_validation.js";

attributeRouter.route("/:aid/:cid").post(requestValidator,verifyAndGetUserRoles,mapCategoryToAttributes);
attributeRouter.route("/create").post(requestValidator,verifyAndGetUserRoles,[validateAddAttributeRequest],addAttribute);
attributeRouter.route("/:id").post(requestValidator,verifyAndGetUserRoles,[validateAddAttributeValueRequest],addAttributeValue);

attributeRouter.route("/").get(requestValidator,verifyAndGetUserRoles,getAttributeValuesForCategories);
attributeRouter.route("/getvalue/:id").get(requestValidator,verifyAndGetUserRoles,getAttributeValuesbyid);


