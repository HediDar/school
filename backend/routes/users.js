const express = require("express");

const route = express.Router();
const User = require("../models/user");

const jwt = require("jsonwebtoken");
// import bcrypt module

const multer = require("multer");
// import path module

const bcrypt = require("bcrypt");

const secretKey = "croco23";

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "application/pdf": "pdf",
};

// multer configuration
const storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/files");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-crococoder-" + "." + extension;
    cb(null, imgName);
  },
});

// business logic user
// getAllUsers

route.get("", (req, res) => {
  console.log("get all users bl");
  User.find().then((docs) => {
    res.json({ users: docs });
  });
});

//business logic signUp
route.post(
  "/signup",
  multer({ storage: storage }).single("file"),
  (req, res) => {
    console.log("in signup BL");

    User.findOne({ email: req.body.email }).then((findedUser) => {
      if (findedUser) {
        return res.json({ message: "email already in use" });
      } else {
        User.findOne({ telephone: req.body.telephone }).then((findedUser) => {
          if (findedUser) {
            return res.json({ message: "phone number already in use" });
          } else {
            let user = new User(req.body);
            bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
              req.body.password = cryptedPwd;
              if (!req.file) {
                return res.json({
                  message: "You must select a file for your user",
                });
              }
              if (req.body.role != "teacher")
                req.body.avatar = `http://localhost:3000/files/${req.file.filename}`;
              else
                req.body.cv = `http://localhost:3000/files/${req.file.filename}`;
              let user = new User(req.body);
              user.save(async function (error, doc) {
                console.log("here doc", doc);
                if (error) {
                  res.json({ message: "an error occured while saving user" });
                } else {
                  res.json({ message: "user added succesfully" });
                }
              });
            });
          }
        });
      }
    });
  }
);

//business logic login
route.post("/login", (req, res) => {
  console.log("in login bl");
  console.log(req.body);
  let myUser;

  User.findOne({ telephone: req.body.telephone })
    .then((findedUser) => {
      if (!findedUser) {
        return res.json({ message: "check your phone number" });
      } else {
        myUser = findedUser;
        return bcrypt.compare(req.body.password, findedUser.password);
      }
    })
    .then((cryptedPwd) => {
      console.log(cryptedPwd);
      if (cryptedPwd) {
        let user_to_send = {
          id: myUser._id,
          firstName: myUser.firstName,
          lastName: myUser.lastName,
          cv: myUser.cv,
          avatar: myUser.avatar,
          role: myUser.role,
        };

        // generate token
        const token = jwt.sign(user_to_send, secretKey, {
          expiresIn: "1h",
        });

        res.json({
          message: "welcome",
          token: token,
        });
      } else {
        res.json({ message: "check your password" });
      }
    });
});

module.exports = route;
