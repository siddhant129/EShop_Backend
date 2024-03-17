const mongoose = require("mongoose");
const OrderItem = require("../Models/orderItems");
const Users = require("../Models/user");
const Products = require("./product");

const orderItemSchema = mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

orderItemSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

orderItemSchema.set("toJSON", {
  virtuals: true,
});

const ordersSchema = mongoose.Schema({
  orderItems: {
    type: orderItemSchema,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  apartment: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["cart", "Pending", "Order Placed", "Delivered"],
    default: "cart",
  },
  totalPrice: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

ordersSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

ordersSchema.set("toJSON", {
  virtuals: true,
});

exports.Orders = mongoose.model("Orders", ordersSchema);
