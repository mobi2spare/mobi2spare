import { check } from "express-validator";

export const validateAddAttributeRequest = [
  check("attribute_name").notEmpty().withMessage("Name is required"),
];



export const validateAddAttributeValueRequest = [
    check("attribute_value").notEmpty().withMessage("Attribute Value is required"),
  ];