const express = require('express');
const auth = require('../utili/auth');
const router = express.Router();
const userTypeController = require('../controllers/userType.controller');

router.post('/',auth.authMW,userTypeController.createUserType);
router.get('/',auth.authMW,userTypeController.getUserTypes);

module.exports= router;