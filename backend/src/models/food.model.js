const mongoose = require("mongoose");
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  foodpartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodpartner",
  }
})

const foodmodel = mongoose.model("food", foodSchema);

module.exports = foodmodel;
