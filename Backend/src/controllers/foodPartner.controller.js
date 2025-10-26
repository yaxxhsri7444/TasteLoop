const foodPartneModel = require("../models/foodpartner.model");
const FoodModel = require("../models/food.model");

async function getFooditemBypartnerId(req, res) {
  const foodPartnerId = req.params.id;
  try {
    const foodPartner = await foodPartneModel.findById(foodPartnerId);
    if (!foodPartner) {
      return res.status(404).json({ message: "Food Partner not found" });
    }

    // Find food items (videos) published by this partner
    const videos = await FoodModel.find({ foodPartner: foodPartnerId }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Food Partner found",
      foodPartner: {
        ...foodPartner.toObject(),
        videos,
      },
    });
  } catch (error) {
    console.error('getFooditemBypartnerId error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getFooditemBypartnerId,
};
