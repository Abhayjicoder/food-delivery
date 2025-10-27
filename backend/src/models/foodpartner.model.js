const mongoose = require('mongoose');
const foodpartnerSchema = new mongoose.Schema({
    fullname: {
        type : String,
        required: true},
    email: {
        type : String,
        required: true,
        unique: true},
    password: {
        type : String,
        //  we are not making password required here because we might have google OAuth users without passwords
    }
},
{ timestamps: true }
//timestamp says when the user was created and updated
);

const foodpartnermodel = mongoose.model('foodpartner', foodpartnerSchema);
// Usermodel is the model we will use to interact with the users collection in the database

module.exports = foodpartnermodel;