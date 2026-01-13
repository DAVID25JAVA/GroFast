import Contact from "../models/contact.js";

export const contactMessage = async (req, res) => {
    const { name, email, message } = req.body;
  try {
    if (!name || !email || !message) {
      return res.json({ success: false, message: "All fields are required!" });
    }
    await Contact.create({
      name,
      email,
      message,
    });
    return res.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
      console.log(error);
      
  }
};
