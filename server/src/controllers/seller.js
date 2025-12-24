import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Seller login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      password == process.env.SELLER_PASSWORD &&
      email == process.env.SELLER_EMAIL
    ) {
      const token = await jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: (process.env.NODE_ENV = "production"),
        sameSite: (process.env.NODE_ENV = "production" ? "none" : "strict"),
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.json({ success: false, message: "Logged In" });
    } else {
      return res.json({ success: false, message: "Invalid credentials!" });
    }
  } catch (error) {
    console.log("Seller login error-->", error?.message);
    return res.json({ success: false, message: error?.message });
  }
};

// seller auth ---> check isSeller login or not
export const isSellerAuth = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    console.log("isAuth error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Seller logout
export const  sellerLogout = (req, res) => {
  try {
    res.clearCookie("sellerToken", {
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