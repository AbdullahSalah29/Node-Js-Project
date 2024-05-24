const Product = require("../models/productModel");
const User = require("../models/userModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  } 
};

const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    return res.status(400).json({ message: "Invalid Id" });
  }
};

const addNewProduct = async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ error: "You are not an admin" });
    }
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { userName, productId } = req.params;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ error: "You are not an admin" });
    }

    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    res.json(product);
  } catch (error) {
    return res.status(400).json({ message: "Invalid request" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { userName, productId } = req.params;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ error: "You are not an admin" });
    }

    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    return res.status(400).json({ message: "Invalid request" });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
