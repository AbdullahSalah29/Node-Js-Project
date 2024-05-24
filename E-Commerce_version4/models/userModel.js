const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  picture: { type: String },
  age: { type: Number, required: true },
  cart: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  isAdmin: { type: Boolean, default: false },
  registerDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
