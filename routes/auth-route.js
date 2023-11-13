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
  registerUser,
  registerValidationRules(),
  registerValidate
);
route.post("/login", loginUser, loginValidationRules(), loginValidate);
route.get("/logout", logoutUser, verifyToken);

module.exports = route;