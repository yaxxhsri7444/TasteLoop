const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: { type: String, require: true },
  video: { type: String, require: true },
  discription: { type: String },
  foodPartner: { type: mongoose.Schema.Types.ObjectId, ref: "foodpartner" },
});

const food = mongoose.model("food", foodSchema);

module.exports = food;
