import User from "../models/userModel.js";
import { generateToken } from "./Config/generateToken.js";

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  // Validate fields
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // Validate password
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successfull",
      user: { id: user._id, username: user.username, email: user.email },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create user
    const newUser = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, username: newUser.username, email: newUser.email },
      token: generateToken(newUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
