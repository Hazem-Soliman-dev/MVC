const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const upload = require("../config/multerConfig");
const auth = require("../utili/auth");

router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.post("/", auth.adminMW, upload.single("imgeURL"), productController.createProduct);
router.put("/:id", auth.adminMW, upload.single("imgeURL"), productController.updateProduct);
router.put("/status/:id", auth.adminMW, productController.changeStatus);
router.delete("/:id", auth.adminMW, productController.deleteProduct);

module.exports = router;
