const foodmodel = require("../models/food.model");
const storageservice = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createfood(req, res) {
  console.log(req.foodpartner);
  console.log(req.body);
  console.log(req.file);

  const fileuploadresult = await storageservice.uploadfiles(
    req.file.buffer.toString("base64"),
    uuid()
  );

  console.log(fileuploadresult);

  const fooditem = await foodmodel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileuploadresult.url,
    foodpartner: req.foodpartner._id,
  });

  res.status(201).json({
    message: "food created",
    food: fooditem,
  });
}





async function getfooditems(req,res){
    const fooditems = await foodmodel.find({})
    res.status(200).json({
        message:"food item fetched",
        fooditems
    })
}
module.exports = { createfood , getfooditems };
