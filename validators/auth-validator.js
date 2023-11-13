const { body, validationResult } = require("express-validator");

const registerValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("Name cannot be empty"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password cannot be empty"),
    body("konfirmasi_password")
      .notEmpty()
      .withMessage("Confirmation password cannot be empty"),
  ];
};

const registerValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    status: 422,
    message: "Validation error",
    data: extractedErrors,
  });
};

const loginValidationRules = () => {
  return [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password cannot be empty"),
  ];
};

const loginValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    status: 422,
    message: "Validation error",
    data: extractedErrors,
  });
};

module.exports = {
  registerValidationRules,
  registerValidate,
  loginValidationRules,
  loginValidate,
};