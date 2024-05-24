const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Route to get all products
router.route("/").get(productController.getAllProducts);

// Route to add a new product
router.route("/:userName").post(productController.addNewProduct);

// Route to get a single product by ID
router.route("/product/:productId").get(productController.getSingleProduct);

// Route to update or delete a product by ID
router
  .route("/product/:productId/:userName")
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
