const express = require("express");
// import body-parser module

const bodyParser = require("body-parser");
// import express-session module
const session = require("express-session");

const path = require("path");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/schoolDB");

//create express application, app est notre application back end

const app = express();
//config de lapplication
//send json responses
app.use(bodyParser.json());

//get Object from req
app.use(bodyParser.urlencoded({ extended: true }));
//security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PATCH, PUT"
  );
  next();
});
// configuration session

const secretKey = "croco23";
app.use(
  session({
    secret: secretKey,
  })
);

// /backend/files est remplacé par un raccourcie appelé files
app.use("/files", express.static(path.join("backend/files")));
// on define les types qu'on accepte seulement, avec leurs extensions auxquels on definit

const UserRouter = require("./routes/users");

app.use("/users", UserRouter);

module.exports = app;