const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const upload = require("../config/multerConfig");

router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.post("/", upload.single("imgeURL"), productController.createProduct);
router.put("/:id", upload.single("imgeURL"), productController.updateProduct);
router.put("/status/:id", productController.changeStatus);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
