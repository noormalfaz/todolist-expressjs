const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const key = "yaemiko19";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, konfirmasi_password } = req.body;
    const checkEmail = await User.findOne({ where: { email } });

    if (checkEmail) {
      return res.status(400).json({
        status: 400,
        message: "Your email is already registered",
      });
    }

    if (password !== konfirmasi_password) {
      return res.status(400).json({
        status: 400,
        message: "Password and Confirmation Password do not match",
      });
    }

    const salt = bcrypt.genSaltSync();
    const hashPassword = bcrypt.hashSync(password, salt);

    const register = await User.create({ name, email, password: hashPassword });
    res.status(201).json({
      status: 201,
      message: "You have successfully registered",
      data: register,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error during registration",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const checkEmail = await User.findOne({ where: { email: req.body.email } });

    if (!checkEmail) {
      return res.status(400).json({
        status: 400,
        message: "Your email is not registered",
      });
    }

    const matchPassword = bcrypt.compareSync(
      req.body.password,
      checkEmail.password
    );

    if (!matchPassword) {
      return res.status(400).json({
        status: 400,
        message: "Your password is incorrect",
      });
    }

    const accessToken = jwt.sign(
      { id: checkEmail.id, email: checkEmail.email },
      key,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      status: 200,
      message: "You are logged in successfully",
      data: checkEmail,
      token: accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error during login",
    });
  }
};

const logoutUser = (req, res) => {
  console.log(req.payload);
  try {
    const { id, email } = req.payload;
    const invalidatedToken = jwt.sign({ id, email }, key, {
      expiresIn: "1s",
    });

    return res.status(200).json({
      status: 200,
      message: "You are successfully logged out",
      invalidatedToken: invalidatedToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error during logout",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser };