import express from "express";
export const modelsRouter = express.Router();
import {getallModels,addModels,updateModel,deleteModels,getAllModelsForBrand } from "../controllers/models.js";
import { requestValidator } from "../middleware/auth.js";
import { verifyAndGetUserRoles,isAdmin} from "../validators/common_validation.js";
import { tryCatchController } from "../utils/tryCatch.js"

modelsRouter.route("/:id").get(requestValidator,verifyAndGetUserRoles,tryCatchController(getAllModelsForBrand));
modelsRouter.route("/").post(requestValidator,verifyAndGetUserRoles,isAdmin,tryCatchController(addModels));
modelsRouter.route("/").get(requestValidator,verifyAndGetUserRoles,tryCatchController(getallModels));
modelsRouter.route("/:id").put(requestValidator,verifyAndGetUserRoles,isAdmin,tryCatchController(updateModel));
modelsRouter.route("/:id").delete(requestValidator,verifyAndGetUserRoles,isAdmin,tryCatchController(deleteModels));
// productRouter.route("/:id").put(requestValidator,verifyAndGetUserRoles,[validateAddListingRequest],updateProductForSeller);
// productRouter.route("/:id").delete(requestValidator,verifyAndGetUserRoles,deleteProductForSeller);
// productRouter.route('/upload/:uid/').post(requestValidator,verifyAndGetUserRoles,upload.array('file'),uploadProductImage);
// productRouter.route('/:id/').patch(requestValidator,verifyAndGetUserRoles,tryCatchController(updateProductWithImage));
// productRouter.route("/").get(requestValidator,verifyAndGetUserRoles,getAllProducts);
// productRouter.route("/:id").get(requestValidator,verifyAndGetUserRoles,getAllProductsForCategory);
// productRouter.route("/:pid").get(requestValidator,verifyAndGetUserRoles,getInfoForProduct);
