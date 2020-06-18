const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const passport = require("passport");
const saml = require("passport-saml");
const fs = require("fs");

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

app.get("/", (req, res) => {
  res.send("Test Home Page");
});

app.get(
  "/login",
  (req, res, next) => {
    console.log("-----------------------------");
    console.log("/Start login handler");
    next();
  },
  passport.authenticate("samlStrategy")
);

const server = app.listen(4300, () => {
  console.log("Listening on port %d", server.address().port);
});
