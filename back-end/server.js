import express from "express";

const app = express();


// basic home route
app.get("/", (req, res) => {
    res.send("Hello from the server...");
});

// server
app.listen(5000, () => {
    console.log("server running on port port 5000");
});