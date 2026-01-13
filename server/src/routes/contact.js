import express from 'express'
import { contactMessage } from '../controllers/contact.js';

const contactRouter = express.Router();

contactRouter.post("/sent/message", contactMessage)
contactRouter.get("/get/message", contactMessage)

export default contactRouter