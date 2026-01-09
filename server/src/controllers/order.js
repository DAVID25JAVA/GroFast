import orderModel from "../models/order.js";
import productModel from "../models/product.js";

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!userId || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid Data" });
    }
    let amount = 0;
    for (const item of items) {
      const product = await productModel.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: "Product not found" });
      }
      amount += product.price * item.quantity;
    }
    // Add 2% tax
    amount += Math.floor(amount * 0.02);
    await orderModel.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });
    return res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log("Order error--->", error.message);
    return res.json({ success: false, message: error.message });
  }
};

// Get Order by UserId
export const getOrderByUserId = async (req, res) => {
  try {
     const userId = req.user.id;
    const orderData = await orderModel
      .find({
        userId,
        $or: [{ paymentType: "COD" }, { isPaid: true }],
      })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    return res.json({ success: true, orderData });
  } catch (error) {
    console.log("Get order by user id error--->", error?.message);
    return res.json({ success: false, message: error?.message });
  }
};

// Get All order for Admin and Seller
export const getAllOrder = async (req, res) => {
  try {
    const allorder = await orderModel
      .find({
        $or: [{ paymentTeype: "COD", isPaid: true }],
      })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    return res.json({ success: true, allorder });
  } catch (error) {
    console.log("Get all order error--->", error?.message);
    return res.json({ success: false, message: error?.message });
  }
};
