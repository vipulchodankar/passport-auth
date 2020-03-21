const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const expressSession = require("express-session");
const User = require("./models/User");

mongoose.connect("mongodb://localhost/passport-auth", { useNewUrlParser: true, useUnifiedTopology: true });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
    secret: "There are no secrets",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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