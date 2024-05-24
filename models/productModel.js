const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String },
  registerDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
