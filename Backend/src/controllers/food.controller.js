const foodModel = require('../models/food.model');
const storageServices = require('../services/storage.service');
const { v4: uuid } = require('uuid');

async function createFood(req, res){
    console.log(req.foodPartner);
    console.log(req.body);
    console.log(req.file);

    const fileUploadResult = await storageServices.uploadFile(req.file.buffer, uuid())

    res.send("food in created");
}

module.exports = { createFood }