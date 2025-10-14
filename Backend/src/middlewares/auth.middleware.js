const foodPartnerModels = require("../models/foodpartner.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authfoodPartnermiddle(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "please login first" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_TOKEN);
    const foodpartner = await foodPartnerModels.findById(decode.id);

    if (!foodpartner) {
      return res.status(401).json({ message: "Unauthoried" });
    }

    req.foodpartner = foodpartner;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}


async function authUsermiddle(req, res, next) {
   const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "please login first" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await userModel.findById(decode.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthoried" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}


module.exports = { authfoodPartnermiddle, authUsermiddle };
