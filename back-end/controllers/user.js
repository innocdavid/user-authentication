import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { User } from "../models/user.js";

const signup = asyncHandler( async(req, res) => {
    // destructure
    const { username, email, password } = req.body;

    // checking whether user already exist
    let existingUser;
    try{
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        console.log(err);
    }

    if (existingUser) {
        return res.status(400).json({ message: "User already exist, login instead!"});
    }

    // hash password
    const hashedPassword = bcrypt.hashSync(password);
    // model
    const user = new User({ username, email, password: hashedPassword });
    try {
        await user.save();
    } catch (err) {
        console.log(err)
    }

    return res.status(200).json({ message: user })
});

export { signup };