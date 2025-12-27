import User from "../models/User.model.js";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith(Bearer)
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route, not token provided",
    });
  }

  try {
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User belonging to this token does not exist ",
      });
      next();
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Not authorized to access this route, Invalid token",
    });
  }
};

export { protect };
