const express = require("express");
//const { addCategory, getCategories } = require("../controllers/category");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const multer = require("multer");

const router = express.Router();
const shortid = require("shortid");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const {
  createProduct,
  // getProductsBySlug,
  // getProductDetailsById,
  // deleteProductById,
  // getProducts,
} = require("../controllers/product");
router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);
//router.get("/category/getcategory", getCategories);

module.exports = router;
