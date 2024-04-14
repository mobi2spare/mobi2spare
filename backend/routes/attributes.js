import express from "express";
export const attributeRouter = express.Router();
import {addAttribute,addAttributeValue } from "../controllers/attributes.js";
import {
    validateAddAttributeRequest,validateAddAttributeValueRequest
  } from "../validators/attributes.js";
import { requestValidator } from "../middleware/auth.js";
import { verifyAndGetUserRoles } from "../validators/common_validation.js";

attributeRouter.route("/").post(requestValidator,verifyAndGetUserRoles,[validateAddAttributeRequest],addAttribute);
attributeRouter.route("/:id").post(requestValidator,verifyAndGetUserRoles,[validateAddAttributeValueRequest],addAttributeValue);



