import User from "../models/user.js";

export const updateCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;
    await User.findByIdAndUpdate(userId, { cartItems });
    return res.json({ success: false, message: "Cart updated" });
  } catch (error) {
    console.log(" Cart error---->", error?.message);
    return res.json({ success: false, message: error.message });
  }
};
