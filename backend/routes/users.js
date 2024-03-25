const express = require("express");
const {
  me,
  getAll,
  uploadKycDoc,
  uploadKycSelf,
  uploadKycStore,
} = require("../controllers/user");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.route("/:id").get(me);
router.route("/").get(auth(["admin"]), getAll);
router.route("/:id/kyc-document").post(auth(["admin", "user"]), uploadKycDoc);
router.route("/:id/kyc-self").post(auth(["admin", "user"]), uploadKycSelf);
router.route("/:id/kyc-store").post(auth(["admin", "user"]), uploadKycStore);

module.exports = router;
