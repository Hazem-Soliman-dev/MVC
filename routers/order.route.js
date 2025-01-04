const express = require("express");
const orderRoute = require("../controllers/order.controller");

const router = express.Router();

router.get("/", orderRoute.getOrders);
router.get("/:id", orderRoute.getOrderById);
router.post("/", orderRoute.createOrder);
router.put("/:id", orderRoute.updateOrder);
router.put("/status/:id", orderRoute.changeStatus);
router.delete("/:id", orderRoute.deleteOrder);

module.exports = router;