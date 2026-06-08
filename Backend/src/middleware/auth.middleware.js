import jwt from "jsonwebtoken"
import { config } from "../config/config.js";

async function authUser(req, res, next) {
    const token = req.cookies.token;
    console.log(req.cookies);
    

    if (!token) {
        return res.status(401).json({
            message: "Token not provided"
        })
    }

    let decoded;

    try {
        decoded = jwt.verify(token, config.JWT_SECRET)

        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message: "user not authorized"
        })
    }
}

export default authUser;