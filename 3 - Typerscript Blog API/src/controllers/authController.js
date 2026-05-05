import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const registerFunction = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "Email Already Exists." });
    }
    const newUser = await User.create({
      username,
      email,
      password,
    });

    return res.status(201).json({ message: "User Registered Successfully." });
  } catch (e) {
    return res.status(500).json({ message: "Server error", error: e.message });
  }
};

const loginFunction = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Email and Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email and Password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });
    res.status(200).json({
      status: "Success",
      token: token,
      data: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (e) {
    return res.status(500).json({ message: "Server Error", error: e.message });
  }
};

export default {
  registerFunction,
  loginFunction,
};
