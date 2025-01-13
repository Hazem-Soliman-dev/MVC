const express = require("express");
const auth = require("../utili/auth");
const router = express.Router();
const userTypeController = require("../controllers/userType.controller");

router.get("/", auth.adminMW, userTypeController.getUserTypes);
router.post("/", auth.adminMW, userTypeController.createUserType);

module.exports = router;
