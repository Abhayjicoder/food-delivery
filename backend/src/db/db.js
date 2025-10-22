// connecting to mongodb database
const mongoose = require('mongoose');

function connectdb(){
    mongoose.connect('mongodb://localhost:27017/foodDeliveryy').then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log("Error connecting to MongoDB:", err);
    }); 
}
module.exports = connectdb;