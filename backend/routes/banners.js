import express from "express";
export const banneRouter = express.Router();
import { upload } from "../constants/constants.js";
import { addbanner,editbanner,deletebanner,getAllbanners,uploadbannervideo } from "../controllers/banners.js";
import { requestValidator } from "../middleware/auth.js";
import { verifyAndGetUserRoles,isAdmin } from "../validators/common_validation.js";
import { tryCatchController } from "../utils/tryCatch.js"
//import { auth } from "../middleware/auth.js";

//router.route("/").post(auth(["admin"]), add);
//router.route("/").get(getAll);
//router.route("/:id").put(auth(["admin"]), deActivateBanner);
banneRouter.route('/').get(requestValidator,verifyAndGetUserRoles,tryCatchController(getAllbanners));
banneRouter.route('/').post(requestValidator,verifyAndGetUserRoles,isAdmin,tryCatchController(addbanner));
banneRouter.route('/:id').put(requestValidator,verifyAndGetUserRoles,isAdmin,tryCatchController(editbanner));
banneRouter.route('/:id').delete(requestValidator,verifyAndGetUserRoles,isAdmin,tryCatchController(deletebanner));
banneRouter.route('/upload/:id').post(requestValidator,verifyAndGetUserRoles,upload.single('file'),uploadbannervideo);

