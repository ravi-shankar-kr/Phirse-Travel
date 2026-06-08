import { config } from "../config/config.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export async function registerController(req, res) {
    const {fullName, email, password, phone, } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
         email
    })

    if (isUserAlreadyExists) {
        return res.status(401).json({
            message: "email/ phone is already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password:hash,
        phone 
    })
    
    const token = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET,{
        expiresIn: "7d"
    })

    res.cookie("token", token);

    res.status(201).json({
        message: "user register successfully",
        user
    })
}

export async function loginController(req, res) {
    const {email, phone, password} = req.body;

    const user = await userModel.findOne({
         email
    })

    if (!user) {
        return res.status(401).json({
            message: "Invalid email "
        })
    }

    // const hash = bcrypt.hash(password, 10);

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({
        id:user._id
    }, config.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("token", token)

    res.status(200).json({
        message:"user login successfully",
        success:true,
        user:{
            email:user.email,
            name: user.name,
            phone: user.phone
            
        }
    })
}