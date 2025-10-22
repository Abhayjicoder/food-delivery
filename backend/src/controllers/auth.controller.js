const usermodel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");     



async function registerUser(req, res) {

    
  const { fullname, email, password } = req.body;

  // check if user already exists
  const isuserexist = await usermodel.findOne({ email: email });
  if (isuserexist) {
    return res.status(400).json({ message: "User already exists" });
  }
const hashedPassword = await bcrypt.hash(password, 10);

const user = await usermodel.create({
    fullname,
    email,
    password: hashedPassword});

    // token is used to verify the user in subsequent requests
    const token = jwt.sign({
        id: user._id,
        email: user.email
    },"281751bcd960bb7d9e39c2b1b7f1ecc79ecf8754")

 res.cookie("token", token)
 
//  status 201 is used to indicate that a resource has been created successfully
 res.status(201).json({ message: "User registered successfully", user:{
    id: user._id,
    fullname: user.fullname,
    email: user.email
 }});

}

async function loginUser(req, res) {

  
}

module.exports = {registerUser};