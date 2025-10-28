// create server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.route');
const app = express();
const cors = require("cors");


// cors is used because it Controls access between different origins
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));

//middleware to parse JSON bodies

app.use(express.json());


app.use(cookieParser()) //middleware to parse cookies

// routes


app.get('/', (req, res) => {
  res.send('Hello World!');
});


// auth routes is used for user registration and login
// /api/auth prefix is used for all auth routes and it helps to organize the routes
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);


module.exports = app;