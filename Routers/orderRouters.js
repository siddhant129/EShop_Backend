const express = require("express");
const routers = express.Router();
const { Orders } = require("../Models/orders");
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
} = require("../Controller/orderController");

routers
  // To get all orders user specific
  .get("/", getOrders)

  // To get specific order of user
  .get("/:id", getOrder)

  // To place new order
  .post("/createOrd", createOrder)

  // To update order
  .put("/updateOrder", updateOrder);

module.exports = routers;
