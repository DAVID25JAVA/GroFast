import orderModel from "../models/order.js";
import productModel from "../models/product.js";
import Stripe from "stripe";
import User from "../models/user.js";

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
    console.log(userId);

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

// API with payment getway
// export const placeOrderWithStripe = async (req, res) => {
//   try {
//     const { userId, items, address } = req.body;
//     const { origin } = req.headers;
//     console.log("origin--->", origin);
//     if (!userId || !items || items.length === 0) {
//       return res.json({ success: false, message: "Invalid Data" });
//     }
//     let productData = [];

//     let amount = 0;
//     for (const item of items) {
//       const product = await productModel.findById(item.product);
//       productData.push({
//         tittle: product?.tittle,
//         price: product?.offerPrice,
//         quantity: item?.quantity,
//       });

//       if (!product) {
//         return res.json({ success: false, message: "Product not found" });
//       }
//       amount += product.price * item.quantity;
//     }
//     // Add 2% tax
//     amount += Math.floor(amount * 0.02);
//     const orders = await orderModel.create({
//       userId,
//       items,
//       amount,
//       address,
//       paymentType: "Online",
//     });

//     // Initialize payment geteway
//     const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

//     // create line item for stripe
//     const line_items = productData?.map((item) => {
//       return {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: item?.tittle,
//           },
//           unit_amount:
//             Math.floor(item?.offerPrice + item?.offerPrice * 0.02) * 100,
//         },
//         quantity: item?.quantity,
//       };
//     });

//     // create session
//     const session = await stripeInstance.checkout.sessions.create({
//       line_items,
//       mode: "payment",
//       success_url: `${origin}/loader?next=my-orders`,
//       cancel_url: `${origin}/cart`,
//       metadata: {
//         orderId: orders?._id.toString(),
//         userId,
//       },
//     });

//     return res.json({ success: true, url: session.url });
//   } catch (error) {
//     console.log("Order error--->", error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };

const TAX_RATE = 0.02; // 2%

export const placeOrderWithStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;
    if (!userId || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid Data" });
    }

    let amount = 0;
    let productData = [];
    for (const item of items) {
      const product = await productModel.findById(item.product);

      if (!product) {
        return res.json({ success: false, message: "Product not found" });
      }

      const price = product.offerPrice; // ✅ single source of truth
      const itemTotal = price * item.quantity;
      amount += itemTotal;
      productData.push({
        tittle: product.tittle,
        price,
        quantity: item.quantity,
      });
    }

    // ✅ Apply tax ONCE on total
    const tax = Math.round(amount * TAX_RATE);
    const finalAmount = amount + tax;

    // Save order
    const order = await orderModel.create({
      userId,
      items,
      amount: finalAmount,
      address,
      paymentType: "Online",
    });

    // Stripe instance
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Stripe line items (amount in cents)
    const line_items = productData.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.tittle,
        },
        unit_amount: Math.round(item.price * (1 + TAX_RATE) * 100),
      },
      quantity: item.quantity,
    }));

    // Create session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/loader?next=my-order`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });

    return res.json({ success: true, url: session.url });
  } catch (error) {
    console.log("Order error --->", error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const stripeWebhook = async (req, res) => {
  const stripewebhook = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sign = req.headers["stripe-signature"];
  let event;
  try {
    event = stripewebhook.webhooks.constructEvent(
      req.body,
      sign,
      process.env.STRIPE_SECRET_KEY
    );
  } catch (error) {
    console.log("Web hook error:", error?.message);
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // getting session metadeta
      const session = await stripewebhook.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { orderId, userId } = session.data[0].metadata;
      // mark payment ass paid
      await orderModel.findByIdAndUpdate(orderId, { isPaid: true });
      // clear user cart
      await User.findByIdAndUpdate(userId, { cartItems: {} });
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // getting session metadeta
      const session = await stripewebhook.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { orderId } = session.data[0].metadata;
      await orderModel.findByIdAndDelete(orderId);
      break;
    }

    default:
      console.log("Unhandled event type", event.type);
      break;
  }
  res.json({ received: true });
};
