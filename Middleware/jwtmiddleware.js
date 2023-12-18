import jwt from "jsonwebtoken"
require("dotenv").config();
const secret = process.env.JWT_KEY

const authMiddleware = async (req ,res , next) => {

    try {
        const token = req.headers.authorization.split(" ")
        
    } catch (error) {
        
    }
}