const usermodel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const foodpartnermodel = require("../models/foodpartner.model");
require("dotenv").config();

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
    password: hashedPassword,
  });

  // token is used to verify the user in subsequent requests
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  //  status 201 is used to indicate that a resource has been created successfully
  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await usermodel.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const ispasswordvalid = await bcrypt.compare(password, user.password);
  if (!ispasswordvalid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);
  res.status(200).json({
    message: "User logged in successfully",
    user: { _id: user._id, fullname: user.fullname, email: user.email },
  });
}

function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
}

async function registerfoodpartner(req, res) {
  const { fullname, email, password, phoneno, contactname,address} = req.body;

  // check if user already exists
  const isuserexist = await foodpartnermodel.findOne({ email: email });
  if (isuserexist) {
    return res.status(400).json({ message: "food partner already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const foodpartner = await foodpartnermodel.create({
    fullname,
    email,
    password: hashedPassword,phoneno, contactname,address
  });

  // token is used to verify the user in subsequent requests
  const token = jwt.sign(
    {
      id: foodpartner._id,
      email: foodpartner.email,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  //  status 201 is used to indicate that a resource has been created successfully
  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: foodpartner._id,
      fullname: foodpartner.fullname,
      email: foodpartner.email,
    },
  });
}

async function loginfoodpartner(req, res) {
  const { email, password } = req.body;

  const foodpartner = await foodpartnermodel.findOne({ email: email });

  if (!foodpartner) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const ispasswordvalid = await bcrypt.compare(password, foodpartner.password);

  if (!ispasswordvalid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    {
      id: foodpartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "foodpartnerlogged in successfully",
    user: {
      _id: foodpartner._id,
      fullname: foodpartner.fullname,
      email: foodpartner.email,
    },
  });
}

function logoutfoodpartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "foodpartner logged out successfully" });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerfoodpartner,
  loginfoodpartner,
  logoutfoodpartner,
};
