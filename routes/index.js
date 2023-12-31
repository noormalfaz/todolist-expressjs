const express = require("express");
const route = express.Router();
const verifyToken = require("../middleware/auth");
const authRoutes = require("./auth-route");
const userRoutes = require("./user-route");
const todoRoutes = require("./todo-route");

route.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Selamat datang di API Todolist",
  });
});

route.use("/", authRoutes);
route.use("/user", verifyToken, userRoutes);
route.use("/todos", verifyToken, todoRoutes);

module.exports = route;