import jwt from "jsonwebtoken";

export const sellerAuth = async (req, res, next) => {
  const { sellerToken } = req.cookies;
  // console.log("seller token---->", sellerToken, req.cookies);

  if (!sellerToken) {
    return res.status(401).json({ success: false, message: "Seller Not Authorized" });
  }

  try {
    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
    if (tokenDecode.email == process.env.SELLER_EMAIL) {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: error?.message });
  }
};
