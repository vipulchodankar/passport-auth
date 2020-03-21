const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/passport-auth", { useNewUrlParser: true, useUnifiedTopology: true });

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/secret", (req, res) => {
    res.render("secret");
})

const PORT = process.env.PORT | 6969;

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}/`);
})