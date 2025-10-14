const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const food = require("../controllers/food.controller");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/",
  authMiddleware.authfoodPartnermiddle,
  upload.single("video"),
  food.createFood
);

router.get(
  "/get",
  authMiddleware.authUsermiddle,
  food.getFooditem
);

module.exports = router;
