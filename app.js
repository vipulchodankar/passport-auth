const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const expressSession = require("express-session");
const User = require("./models/User");

const PORT = process.env.PORT | 6969;

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

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }

    res.redirect("/login");
};

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/secret", isLoggedIn, (req, res) => {
    res.render("secret");
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.post("/register", (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.render("register");
        }

        passport.authenticate("local")(req, res, () => {
            res.redirect("/secret");
        })
    })
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res) => {

});

app.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}/`);
})