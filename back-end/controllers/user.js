import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { User } from "../models/user.js";


// user singup
const signup = asyncHandler( async(req, res) => {
    // checking whether user already exist
    let existingUser;
    try{
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        console.log(err);
    }

    if (existingUser)  return res.status(400).json({ message: "User already exist, login instead!"});

    // destructure
    const { username, email, password } = req.body;

    // hash password
    const hashedPassword = bcrypt.hashSync(password);

    // save user
    const user = new User({ username, email, password: hashedPassword });
    try {
        await user.save();
    } catch (err) {
        console.log(err)
    }

    return res.status(200).json({ message: user })
});

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

    res.status(200).json({ message: "User successful login"});
});

export { signup , login };