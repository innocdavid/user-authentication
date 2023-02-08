import express from "express";

const app = express();


// basic route
app.get("/", (req, res) => {
    res.send("Hello from server");
});

// server
app.listen(5000, () => {
    console.log("server listening on port 5000");
});