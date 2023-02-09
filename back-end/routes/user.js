import express from "express";
import { signup } from "../controllers/signup.js";
import { login } from "../controllers/login.js";
import { verifyToken, getUser } from "../controllers/token.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser); 

export { router }