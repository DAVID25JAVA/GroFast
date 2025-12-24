import userAddressModel from "../models/address.js";

// add user address API --->
export const addAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;
    if (!address || !userId) {
      return res.json({ success: false, message: "All fields are required!" });
    }
    await userAddressModel.create({ ...address, userId });
    return res.json({ success: true, message: "Address added successfully" });
  } catch (error) {
    console.log("Add address error---->", error?.message);
    return res.json({ success: false, message: error.message });
  }
};

export const getAddress = async (req, res) => {
  try {
    const { userId } = req.body;
    const address = await userAddressModel.find({ userId });
    return res.json({ success: true, address });
  } catch (error) {
    console.log("Get address error---->", error?.message);
    return res.json({ success: false, message: error.message });
  }
};
