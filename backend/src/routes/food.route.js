const express =require('express');
const router = express.Router();
const authmiddleware = require("../middleware/authmiddleware")
const foodcontroller = require("../controllers/food.controller")
const multer = require("multer")

const upload = multer({
    storage:multer.memoryStorage()
})
// post: /api/food/[protected]
router.post("/",authmiddleware.authfoodpartnermiddleware,upload.single("video"),foodcontroller.createfood)


// get: /api/food/[protected]
router.get("/",authmiddleware.authusermiddleware,foodcontroller.getfooditems)

module.exports=router;