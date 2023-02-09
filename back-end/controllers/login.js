// importing modules
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/user.js";

// token
const JWT_SECRET_TOKEN = "thisisthesecret";

// user login
const login = asyncHandler( async(req, res) => {
    const { email, password } = req.body;
    
    // checking user
    let existingUser;
    try{
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        console.log(err);
    }

    // invalid user
    if (!existingUser) return res.status(400).json({ message: "User does not exist, please sign up!"});
    
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    // invalid password or email
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid email or password."});

    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_TOKEN, { expiresIn: "30s" });

    res.cookie(String(existingUser._id), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: "lax"
    })

    res.status(200).json({ message: "User successful login", user: existingUser, token: token });
});

export { login };