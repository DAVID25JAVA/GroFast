import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Create account API
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "missing details" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exist" });
    }
    // bcrypt password
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword });
    const token = jwt.sign({ id: user?._id }, process?.env?.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: (process.env.NODE_ENV = "production"),
      sameSite: (process.env.NODE_ENV = "production" ? "none" : "strict"),
      maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiration time
    });

    return res.json({
      success: true,
      user: { name: user?.name, email: user?.email },
    });
  } catch (error) {
    console.log("Register error:", error?.message);
    res.json({ success: false, message: error?.message });
  }
};

// Login API
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "email password are required",
      });
    }

    const userexist = await User.findOne({ email });
    if (!userexist) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, userexist?.password);

    if (!isMatch)
      return res.json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: userexist?._id }, process?.env?.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: (process.env.NODE_ENV = "production"),
      sameSite: (process.env.NODE_ENV = "production" ? "none" : "strict"),
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      user: { name: userexist?.name, email: userexist?.email },
    });
  } catch (error) {
    console.log("Login error:", error?.message);
    res.json({ success: false, message: error?.message });
  }
};

// Check isAuth user API
export const isAuth = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    return res.json({ success: true, user });
  } catch (error) {
    console.log("isAuth error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// logout API
export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: (process.env.NODE_ENV = "production"),
      sameSite: (process.env.NODE_ENV = "production" ? "none" : "strict"),
    });
    return res.json({ success: true, message: "logged Out" });
  } catch (error) {
    console.log("logout error:", error?.message);
    res.json({ success: false, message: error?.message });
  }
};
