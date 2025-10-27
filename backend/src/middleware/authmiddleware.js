const foodpartnermodel= require("../models/foodpartner.model")
const usermodel=require("../models/user.model")
const jwt = require("jsonwebtoken")

async function authfoodpartnermiddleware(req , res , next){

    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"please login first"
        })
    }
    try {
        const decoded=jwt.verify(token , process.env.JWT_SECRET)
        const foodpartner = await foodpartnermodel.findById(decoded.id)
        req.foodpartner = foodpartner // creating new property to get verified token
        next()

    } catch(err){
        return res.status(401).json({
            message:"invalid token"
        })

    }
}

async function authusermiddleware(req,res,next){
const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"please login first"
        })
    }
    try {
        const decoded=jwt.verify(token , process.env.JWT_SECRET)
        const user = await usermodel.findById(decoded.id)
        req.user = user // creating new property to get verified token
        next()

    } catch(err){
        return res.status(401).json({
            message:"invalid token"
        })

    }

}
 module.exports = {
    authfoodpartnermiddleware , authusermiddleware
 }