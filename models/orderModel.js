const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  totalPrice: { type: Number, required: true },
  registerDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
