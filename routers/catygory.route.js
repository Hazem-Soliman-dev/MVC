const express = require("express");
const categoryRoute = require("../controllers/catygory.controller");

const router = express.Router();

router.get("/", categoryRoute.getCategories);
router.get("/:id", categoryRoute.getCategoryById);
router.post("/", categoryRoute.createCategory);
router.put("/:id", categoryRoute.updateCategory);
router.put("/status/:id", categoryRoute.changeStatus);
router.delete("/:id", categoryRoute.deleteCategory);

module.exports = router;
