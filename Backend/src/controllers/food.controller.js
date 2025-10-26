const foodModel = require("../models/food.model");
const likesModel = require("../models/likes.model");
const saveModel = require("../models/save.model");
const storageServices = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  try {
    // auth middleware sets req.foodpartner (note lowercase)
    const partner = req.foodpartner || req.foodPartner;
    if (!partner) {
      return res.status(401).json({ message: "Unauthorized: missing partner" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    // Upload video to storage (ImageKit)
    const fileUploadResult = await storageServices.uploadFile(
      req.file.buffer,
      uuid()
    );
    // ImageKit returns an object that typically includes `url` or `filePath`
    const videoUrl = fileUploadResult?.url || fileUploadResult?.filePath || "";

    // Create DB record
    const created = await foodModel.create({
      name: req.body.name,
      video: videoUrl,
      discription: req.body.description || req.body.discription || "",
      foodPartner: partner._id,
    });

    return res
      .status(201)
      .json({ message: "Food created successfully", food: created });
  } catch (error) {
    console.error("createFood error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function getFooditem(req, res) {
  const foodItem = await foodModel.find({});
  res.status(200).json({
    message: "Food Item Fetched SuccessFully",
    foodItem,
  });
}

async function likeFoodItem(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await likesModel.findOne({
    user: user._id,
    foodItem: foodId,
  });

  if (isAlreadyLiked) {
    await likesModel.deleteOne({ user: user._id, foodItem: foodId });
    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likesCount: -1 },
    });
    return res.status(200).json({ message: "Food item unliked successfully." });
  }

  const like = await likesModel.create({
    user: user._id,
    foodItem: foodId,
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likesCount: 1 },
  });

  return res
    .status(201)
    .json({ message: "Food item liked successfully.", like });
}

async function saveFoodItem(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadySaved = await saveModel.findOne({
    user: user._id,
    foodItem: foodId,
  });

  if (isAlreadySaved) {
    await saveModel.deleteOne({ user: user._id, foodItem: foodId });
    return res.status(200).json({ message: "Food item unsaved successfully." });
  }
  const save = await saveModel.create({
    user: user._id,
    foodItem: foodId,
  });

  return res
    .status(201)
    .json({ message: "Food item saved successfully.", save });
}

// Get saved foods for the authenticated user
async function getSavedFoods(req, res) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Please login' });

    const saved = await saveModel
      .find({ user: user._id })
      .populate({ path: 'foodItem', populate: { path: 'foodPartner' } });

    return res.status(200).json({ message: 'Saved foods fetched', savedFoods: saved });
  } catch (error) {
    console.error('getSavedFoods error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports = {
  createFood,
  getFooditem,
  likeFoodItem,
  saveFoodItem,
  getSavedFoods,
};
