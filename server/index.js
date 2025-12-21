import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './src/db/db.js';


await connectDB()
const server = express();
server.use(express.json());

server.use((req, res) => {
    res.send("API is working fine.........")
})


const PORT = process?.env?.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
})