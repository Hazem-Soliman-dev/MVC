const orderModel = require("../models/order.model");

exports.getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    if (!orders) return res.status(404).json({ error: "Orders not found" });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const order = await orderModel.create(req.body);
    if (!order) return res.status(404).json({ error: "Order not created" });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(404).json({ error: "Order not found" });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    const index = order.orderItems.findIndex(
      (item) => item.status === "Pending"
    );
    if (index === -1) {
      order.status = "Delivered";
    } else {
      order.orderItems[index].status = "Shipped";
      order.status = "Shipped";
    }
    await order.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(404).json({ error: "Order not found" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    order.orderItems.forEach((item) => (item.status = "Cancelled"));
    await order.save();
    res.status(204).json();
  } catch (err) {
    res.status(404).json({ error: "Order not found" });
  }
};
