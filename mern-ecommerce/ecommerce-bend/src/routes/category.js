const express = require("express");

//const category = require("../models/category");
const { addCategory, getCategories } = require("../controllers/category");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  "/category/create",
  requireSignin,
  upload.single("categoryImage"),
  adminMiddleware,
  addCategory
);
router.get("/category/getcategory", getCategories);

module.exports = router;
