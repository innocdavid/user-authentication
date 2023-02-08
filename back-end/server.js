import express from "express";
import colors from "colors";
import { db } from "./config/db.js";
import { router } from "./routes/user.js";

const app = express();

// db connection 
db();

// MIDDLEWARE
app.use(express.json());

// basic home route
app.use("/auth", router);

// server
app.listen(5000, () => {
    console.log("server running on port port 5000".bgYellow);
});