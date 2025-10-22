const express =require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post("/user/registration", authController.registerUser);
router.post("/login/registration", authController.loginUser);
module.exports = router;