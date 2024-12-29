const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const upload = require("../config/multerConfig");

router.post("/", upload.single("imgeURL"), productController.createProduct);
router.get("/", productController.getProducts);

module.exports = router;
