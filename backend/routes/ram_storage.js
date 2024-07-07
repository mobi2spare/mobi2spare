import express from "express";
export const phoneConfigurationRouter = express.Router();
import {getAllRamStorageConfigs } from "../controllers/ram_storage.js";
import { requestValidator } from "../middleware/auth.js";
import { verifyAndGetUserRoles } from "../validators/common_validation.js";
import { tryCatchController } from "../utils/tryCatch.js"

phoneConfigurationRouter.route("/").get(requestValidator,verifyAndGetUserRoles,tryCatchController(getAllRamStorageConfigs));