const express = require("express");
const cookieParser = require("cookie-parser");
const authroutes = require("./routes/auth.routes");
const foodroutes = require("./routes/food.routes");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/auth", authroutes);
app.use("/api/food", foodroutes);

module.exports = app;
