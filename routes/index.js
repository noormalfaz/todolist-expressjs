const express = require("express");
const route = express.Router();
const authRoutes = require("./auth-route");

route.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Selamat datang di API Todolist",
  });
});

route.use("/", authRoutes);

module.exports = route;