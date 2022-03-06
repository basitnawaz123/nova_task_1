const express = require("express");
const connectDB = require("./db/config");
const bp = require("body-parser");
const app = express();
const PORT = 8080;
const fs = require("fs");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

connectDB();

// Server connection
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Nova Internship Task 00");
});

// Registering Routes from route folder
var userRouter = require("./routes/User");
var authRouter = require("./routes/Auth");
var actorRouter = require("./routes/Actor");
var movieRouter = require("./routes/Movie");

app.use("/register", userRouter);
app.use("/auth", authRouter);
app.use("/actors", actorRouter);
app.use("/movies", movieRouter);