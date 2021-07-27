const express = require("express");
const {
  addItemToCart,
  //addToCart,
  getCartItems,
  removeCartItems,
} = require("../controllers/cart");
const { requireSignin, userMiddleware } = require("../common-middleware");
const router = express.Router();

// router.post(
//   "/user/cart/addtocart",
//   requireSignin,
//   userMiddleware,
//   addItemToCart
// );
router.post(
  "/user/cart/addToCart",
  requireSignin,
  userMiddleware,
  addItemToCart
);
//router.post("/user/getCartItems", requireSignin, userMiddleware, getCartItems);
//new update
// router.post(
//   "/user/cart/removeItem",
//   requireSignin,
//   userMiddleware,
//   removeCartItems
// );

module.exports = router;
