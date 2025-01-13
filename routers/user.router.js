const express = require('express');
const router = express.Router();
const auth = require('../utili/auth');
const userController = require('../controllers/user.controller');

router.get('/', auth.adminMW, auth.authMW,userController.getUsers);
router.post('/',userController.createUser);
router.post('/login',userController.login);

module.exports= router;