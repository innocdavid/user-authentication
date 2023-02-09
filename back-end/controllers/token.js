// import modules
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

// model
import { User } from "../models/user.js";

// token
const JWT_SECRET_TOKEN = "thisisthesecret";

// verify token
const verifyToken = asyncHandler(async(req, res, next) => {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1]

    // invalide token
    if (!token) return res.status(404).json({ message: "No token found" });
    
    jwt.verify(String(token), JWT_SECRET_TOKEN, (err, user) => {
        // error
        if (err) throw res.status(404).json({ message: "Invalid Token" });

        req.id = user.id
    });
    next();
});

// get user details
const getUser = asyncHandler(async(req, res) => {
    const userId = req.id;
    let user;
    try {
        user = await User.findById(userId, "-password")
    } catch (err) {
        console.log(err)
    }

    if(!user) throw res.status(404).json({ message: "User does not exit" });
    // return user
    res.status(200).json({ user });
});
// export verifciation
export { verifyToken, getUser };