// start server
require('dotenv').config();
const app = require("./src/app"); 
const connectdb =require("./src/db/db");

// connect to database
connectdb();


// start listening for requests
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});