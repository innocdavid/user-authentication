import express from "express";
import cookieParser from "cookie-parser";
import colors from "colors";
import morgan from "morgan";

import { db } from "./config/db.js";
import { router } from "./routes/user.js";

const app = express();

// db connection 
db();

// MIDDLEWARE
app.use(cookieParser());
app.use(morgan("combined"));
app.use(express.json());

// basic home route
app.use("/auth", router);

// server
app.listen(5000, () => {
    console.log("server running on port port 5000".bgYellow);
});