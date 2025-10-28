const express =require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');


// user auth api
router.post("/user/registration", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.logoutUser);

// foodpartner auth api
router.post("/foodpartner/register", authController.registerfoodpartner);
router.post("/foodpartner/login", authController.loginfoodpartner);
router.get("/foodpartner/logout", authController.logoutfoodpartner);

module.exports = router;