const { body, validationResult } = require("express-validator");

const todoValidationRules = () => {
  return [
    body("title").notEmpty().withMessage("Title cannot be empty"),
    body("is_completed")
      .isBoolean()
      .withMessage("is_completed must be a boolean"),
  ];
};

const todoValidate = (req, res, next) => {
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

module.exports = { todoValidationRules, todoValidate };