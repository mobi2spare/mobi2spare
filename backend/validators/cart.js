import { check } from "express-validator";

export const validateAddToCartRequest = [
  check('cart_id')
    .isInt({ min: 1 }) // Validate that it's an integer greater than or equal to 1
    .withMessage("A valid cart id must be provided"),

  check('product_id')
    .isInt({ min: 1 }) // Validate that it's an integer greater than or equal to 1
    .withMessage("A valid product id must be provided"),

];

export const updateCartQuantityRequest = validateAddToCartRequest.concat([
  check('quantity')
  .isInt({ min: 0 }) // Validate that it's an integer greater than or equal to 1
  .withMessage("A valid quantity must be provided"),
])