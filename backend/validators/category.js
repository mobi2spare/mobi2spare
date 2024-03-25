import { check } from "express-validator";

export const validateAddCategoryRequest = [
  check("name").notEmpty().withMessage("Name is required"),
];

