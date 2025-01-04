const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    imgeURL: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "catygory",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "unactive", "deleted"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
