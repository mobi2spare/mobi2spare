import { check } from "express-validator";

export const validateAddListingRequest = [
  check("brand_id").notEmpty().withMessage("Brand ID is required"),
  check("category_id").notEmpty().withMessage("category ID is required"), 
  check("description").notEmpty().withMessage("Description is required"), 
  check("price").notEmpty().withMessage("Price is required"), 
  check("seller_id").notEmpty().withMessage("Seller is required"), 
  
];

