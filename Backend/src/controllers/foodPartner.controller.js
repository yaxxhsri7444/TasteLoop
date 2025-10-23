const foodPartneModel = require("../models/foodpartner.model");

async function getFooditemBypartnerId(req, res) {
  const foodPartnerId = req.params.id;
  const foodPartner = await foodPartneModel.findById(foodPartnerId);
  const foodItemByFoodPartner = await foodPartneModel.findOne({
    _id: foodPartnerId,
  });

  if (!foodPartner) {
    return res.status(404).json({ message: "Food Partner not found" });
  }

  res
    .status(200)
    .json({
      message: "Food Partner found",
      foodPartner: {
        ...foodPartner.toObject(),
        foodItems: foodItemByFoodPartner,
      },
    });
}

module.exports = {
  getFooditemBypartnerId,
};
