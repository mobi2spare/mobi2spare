const express = require("express");
const router = express.Router();

const { add } = require("../controllers/modals");
const { auth } = require("../middleware/auth");
const { validateAddCategoryRequest } = require("../validators/category");

router.route("/").post(validateAddCategoryRequest, auth(["admin"]), add);

module.exports = router;
