import orderModel from "../models/order.js";
import productModel from "../models/product.js";

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!userId && items?.length == 0) {
      return res.json({ success: false, message: "Invalid Data" });
    }

    //   calculate Amount
    let amount = await items.reduce(async (acc, item) => {
      const product = await productModel.findById(item?.product);
      return (await acc) + product * item?.quantity;
    }, 0);

    // Add Tax -->2%
    amount += Math.floor(amount * 0.02);

    await orderModel.create({
      userId,
      items,
      amount,
      address,
      pymentType: "COD",
    });
    return res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log("Order error--->", error?.message);
    return res.json({ success: false, message: error?.message });
  }
};

// Get Order by UserId
export const getOrderByUserId = async (req, res) => {
  try {
    const { userId } = req.body;
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
