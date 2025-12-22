import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ success: false, message: "Not Authorized" });
    }

    req.user = { id: decoded.id }; // ✅ correct place
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }
};

export default authUser;
