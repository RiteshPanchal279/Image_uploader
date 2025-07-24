import { User } from "../model/userModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: "something is missing", success: false });

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    return res
      .status(200)
      .json({ token, success: true, message: "Account created successfully",success:true });
  } catch (error) {
    console.log("Error in user register ", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
      });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      token,
      success: true,
      message: "Account login successfully",
      user,
    });
  } catch (error) {
    console.log("Error in login cnt ", error);
  }
};


