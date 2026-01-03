import User from "../models/user.js";

export const updateCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;
    console.log("id------>", userId, "cartItems--->", cartItems);
    const data = await User.findByIdAndUpdate(userId, { cartItems });
    return res.json({ success: true, message: "Cart updated", data });
  } catch (error) {
    console.log(" Cart error---->", error?.message);
    return res.json({ success: false, message: error.message });
  }
};
