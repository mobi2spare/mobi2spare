import { check, body, oneOf } from "express-validator";

export const validateAddListingRequest = [
  check('quantity')
    .isInt({ min: 1 }) // Validate that it's an integer greater than or equal to 1
    .withMessage("Quantity must be a positive whole number"),

  check('brand_id')
    .isInt({ min: 1 }) // Validate that it's an integer greater than or equal to 1
    .withMessage("A valid brand id is required"),

  oneOf([check('model_id').isInt({ min: 1 }), check('model_name').notEmpty()], {
    message: 'A valid phone model must be provided',
  }),

  oneOf([check('ram_storage_id').isInt({ min: 1 }), check('ram_storage_name').notEmpty()], {
    message: 'A valid phone config must be provided',
  }),
  
  check('category_id')
    .isInt({ min: 1 }) // Validate that it's an integer greater than or equal to 1
    .withMessage("A valid category_id is required"),

  check('user_id')
    .isInt({ min: 1 }) // Validate that it's an integer greater than or equal to 1
    .withMessage("A valid seller is required"),

  check('price')
    .isInt({ min: 1 }) // Validate that it's an integer greater than or equal to 1
    .withMessage("Price must be greater than zero"),

  check("description").notEmpty().withMessage("Description is required"),

];

export const validateAddBuyerRequest = [

check('brand_id')
  .isInt({ min: 1 }) // Validate that it's an integer greater than or equal to 1
  .withMessage("A valid brand id is required"),

oneOf([check('model_id').isInt({ min: 1 })], {
  message: 'A valid phone model must be provided',
}),

oneOf([check('ram_storage_id').isInt({ min: 1 })], {
  message: 'A valid phone config must be provided',
}),

check('category_id')
  .isInt({ min: 1 }) // Validate that it's an integer greater than or equal to 1
  .withMessage("A valid category_id is required"),

check('user_id')
  .isInt({ min: 1 }) // Validate that it's an integer greater than or equal to 1
  .withMessage("A valid seller is required"),


check("description").notEmpty().withMessage("Description is required"),

]

