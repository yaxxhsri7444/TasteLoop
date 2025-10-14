const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const foodPartner = require("../models/foodpartner.model");

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    email,
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "user already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_TOKEN
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user registered succesfully",
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_TOKEN
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user logged in succesfully",
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token"),
    res.status(200).json({
      message: "User logged out sucessfully",
    });
}

async function registerfoodPartner(req, res) {
  const { name, email, password } = req.body;

  const isfoodPartnerAlreadyExists = await foodPartner.findOne({
    email,
  });

  if (isfoodPartnerAlreadyExists) {
    return res.status(400).json({
      message: "Food partner already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodpartner = await foodPartner.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: foodpartner._id,
    },
    process.env.JWT_TOKEN
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "foodPartner registered succesfully",
    foodPartner: {
      _id: foodpartner._id,
      email: foodpartner.email,
      name: foodpartner.name,
    },
  });
}

async function loginfoodPartner(req, res) {
  const { email, password } = req.body;

  const foodpartner = await foodPartner.findOne({ email });

  if (!foodpartner) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, foodpartner.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    {
      id: foodpartner._id,
    },
    process.env.JWT_TOKEN
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "foodPartner logged in succesfully",
    foodPartner: {
      _id: foodpartner._id,
      email: foodpartner.email,
      name: foodpartner.name,
    },
  });
}

async function logoutfoodPartner(req, res) {
  res.clearCookie("token"),
    res.status(200).json({
      message: "food partner logged out sucessfully",
    });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerfoodPartner,
  loginfoodPartner,
  logoutfoodPartner,
};
