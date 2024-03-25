const express = require("express");
const router = express.Router();

const { add, getAll, deActivateBanner } = require("../controllers/banners");
const { auth } = require("../middleware/auth");

router.route("/").post(auth(["admin"]), add);
router.route("/").get(getAll);
router.route("/:id").put(auth(["admin"]), deActivateBanner);

module.exports = router;
