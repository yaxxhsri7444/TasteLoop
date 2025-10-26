const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const food = require("../controllers/food.controller");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/create",
  authMiddleware.authfoodPartnermiddle,
  upload.single("video"),
  food.createFood
);

router.get("/get", authMiddleware.authUsermiddle, food.getFooditem);

router.post("/like", authMiddleware.authUsermiddle, food.likeFoodItem);
router.post("/save", authMiddleware.authUsermiddle, food.saveFoodItem);

// GET saved foods for the logged-in user
router.get("/saved", authMiddleware.authUsermiddle, food.getSavedFoods);

module.exports = router;
