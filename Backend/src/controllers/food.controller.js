const foodModel = require("../models/food.model");
const storageServices = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  try {
    const fileUploadResult = await storageServices.uploadFile(req.file, uuid());
    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUploadResult.url,
      foodPartner: req.foodpartner._id,
    });

    res.status(201).json({
      message: "food created successfully",
      food: foodItem,
    });
  } catch (err) {
    console.error("createFood error:", err);
    res.status(500).send({ error: "file upload failed", details: err.message });
  }
}

async function getFooditem(req, res) { 
    const foodItem = await foodModel.find({});
    res.status(200).json({
        message: "Food items fetched succwssfully",
        foodItem
        
    })
}

module.exports = { createFood , getFooditem };
