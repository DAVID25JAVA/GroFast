import mongoose from "mongoose";

const contackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Contact = mongoose.model("Contact", contackSchema);
export default Contact
