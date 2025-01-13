const express = require("express");
const orderRoute = require("../controllers/order.controller");
const auth = require('../utili/auth');

const router = express.Router();

router.get("/", orderRoute.getOrders);
router.get("/:id", orderRoute.getOrderById);
router.post("/", auth.authMW, orderRoute.createOrder);
router.put("/:id", auth.authMW, orderRoute.updateOrder);
router.put("/status/:id", auth.authMW, orderRoute.changeStatus);
router.delete("/:id", auth.authMW, orderRoute.deleteOrder);

module.exports = router;