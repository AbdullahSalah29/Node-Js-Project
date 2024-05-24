const Order = require("../models/orderModel");

const addOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const result = await newOrder.save();
    res.status(201).json({ message: "Order added successfully", result });
  } catch (error) {
    res.status(400).json({ message: "Error adding order", error });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: "Error fetching orders", error });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const { username } = req.params;
    const orders = await Order.find({ userName: username });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: "Error fetching user orders", error });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(deletedOrder);
  } catch (error) {
    res.status(400).json({ message: "Error deleting order", error });
  }
};

module.exports = {
  addOrder,
  getOrders,
  getMyOrders,
  deleteOrder,
};
