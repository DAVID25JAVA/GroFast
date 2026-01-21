import User from "../models/user.js";
import productModel from "../models/product.js";

export const updateCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;
    // console.log("id------>", userId, "cartItems--->", cartItems);
    const data = await User.findByIdAndUpdate(userId, { cartItems },{ new: true });
    return res.json({ success: true, message: "Cart updated", data });
  } catch (error) {
    console.log(" Cart error---->", error?.message);
    return res.json({ success: false, message: error.message });
  }
};

export const getCartProduct = async (req, res) => {
  try {
    const ids = req.query.ids.split(",");
    // console.log("ids --->", ids);

    const products = await productModel.find(
      { _id: { $in: ids } },
      {
        tittle: 1,
        price: 1,
        offerPrice: 1,
        image: 1,
      }
    );
    return res.status(200).json({ success: true, products });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch cart products" });
    console.log("Get product by cart id -->", error?.message);
  }
};
