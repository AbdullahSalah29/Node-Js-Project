const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Route for getting all orders or adding a new order
router.route("/").get(orderController.getOrders).post(orderController.addOrder);

// Route for getting orders for a specific user
router.route("/:username").get(orderController.getMyOrders);

// Route for deleting a specific order by its ID
router.route("/order/:orderId").delete(orderController.deleteOrder);

module.exports = router;
