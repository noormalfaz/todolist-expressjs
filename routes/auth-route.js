const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/auth-controller");
const verifyToken = require("../middleware/auth");
const {
  registerValidationRules,
  registerValidate,
  loginValidationRules,
  loginValidate,
} = require("../validators/auth-validator");
const route = express.Router();

route.post(
  "/register",
  registerValidationRules(),
  registerValidate,
  registerUser
);
route.post("/login", loginValidationRules(), loginValidate, loginUser);
route.get("/logout", verifyToken, logoutUser);

module.exports = route;