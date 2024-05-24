const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// Route for user registration
router.route("/register").post(userController.addUser);

// Route for user login
router.route("/login").post(userController.getUser);

// Routes for user profile and authentication
router
  .route("/:username")
  .patch(userController.updateuser)
  .get(userController.getUser);

// Routes for cart operations
router.route("/:username/cart/get").get(userController.viewCart);
router.route("/:username/cart/add").post(userController.addToCart);
router
  .route("/:username/cart/remove/:_id")
  .delete(userController.removeFromCart);

module.exports = router;
