const express = require('express');
const foodpartnerController = require("../controllers/foodPartner.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();


router.get("/:id", foodpartnerController.getFooditemBypartnerId);


module.exports = router;