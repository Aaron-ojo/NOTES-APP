import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json("please enter your credentials");
    }

    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });

    if (existingUser) {
      const field = existingUser.email === email ? "email" : "userName";
      return res.status(400).json(`${field} already exists`);
    }

    if (
      (!email === undefined && email.trim() === "") ||
      (!userName === undefined && userName.trim() === "")
    ) {
      return res.status(400).json("please enter a valid name or password");
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json("password must be at least 6 characters long");
    }

    const user = User.create({ userName, email, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "registration successful",
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    req.status(500).json({ success: false, message: error.message });
  }
};
