const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const userName = req.params.username;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isAdmin) {
      const users = await User.find();
      return res.json(users);
    } else {
      return res.status(403).json({ error: "You are not an admin" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addUser = async (req, res) => {
  try {
    const { email, ...otherUserData } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const hashedPassword = await bcrypt.hash(otherUserData.password, 10);
    const user = new User({
      email,
      ...otherUserData,
      password: hashedPassword,
    });
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateuser = async (req, res) => {
  try {
    const { username } = req.params;
    const updatedUserData = req.body;

    const user = await User.findOneAndUpdate({ username }, updatedUserData, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addToCart = async (req, res) => {
  try {
    const { userName } = req.params;
    const { productId } = req.body;

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cart.push(productId);
    await user.save();
    return res
      .status(200)
      .json({ message: "Product added to cart successfully", user });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userName } = req.params;
    const { productId } = req.body;

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cart = user.cart.filter((id) => id !== productId);
    await user.save();
    return res
      .status(200)
      .json({ message: "Product removed from cart successfully", user });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const viewCart = async (req, res) => {
  try {
    const { userName } = req.params;

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const cart = user.cart;
    return res
      .status(200)
      .json({ message: "User's cart retrieved successfully", cart });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  updateuser,
  addToCart,
  removeFromCart,
  viewCart,
};
