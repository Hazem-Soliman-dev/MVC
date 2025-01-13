const express = require("express");
const categoryRoute = require("../controllers/catygory.controller");
const auth = require("../utili/auth");

const router = express.Router();

router.get("/", categoryRoute.getCategories);
router.get("/:id", categoryRoute.getCategoryById);
router.post("/", auth.adminMW, categoryRoute.createCategory);
router.put("/:id", auth.adminMW, categoryRoute.updateCategory);
router.put("/status/:id", auth.adminMW, categoryRoute.changeStatus);
router.delete("/:id", auth.adminMW, categoryRoute.deleteCategory);

module.exports = router;
