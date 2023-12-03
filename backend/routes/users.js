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
        if (myUser.role == "teacher" && myUser.status == "NOK") {
          return res.json({
            message: "Your profile hasnt been approved yet",
          });
        }

        let user_to_send;
        myUser.role == "teacher"
          ? (user_to_send = {
              id: myUser._id,
              firstName: myUser.firstName,
              lastName: myUser.lastName,
              cv: myUser.cv,
              email: myUser.email,
              telephone: myUser.telephone,
              role: myUser.role,
            })
          : (user_to_send = {
              id: myUser._id,
              firstName: myUser.firstName,
              lastName: myUser.lastName,
              avatar: myUser.avatar,
              email: myUser.email,
              telephone: myUser.telephone,
              role: myUser.role,
            });

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

route.put("/editProfile", async function (req, res) {
  // traitement de la requete
  console.log("in BL edit profile");

  let user = await User.findById(req.body.id);

  if (!user) {
    return res.json({ message: "Inexistant user" });
  } else {
    let findMail = await User.findOne({ email: req.body.email });

    if (findMail) {
      if (findMail._id != req.body.id) {
        return res.json({ message: "Email already in use" });
      }
    }

    let findPhone = await User.findOne({ telephone: req.body.telephone });

    if (findPhone) {
      if (findPhone._id != req.body.id) {
        return res.json({ message: "Phone already in use" });
      }
    }
    bcrypt.compare(req.body.oldPassword, user.password).then((pwdResult) => {
      if (!pwdResult) {
        return res.json({ message: "please check old pwd" });
      } else {
        bcrypt.hash(req.body.newPassword, 8).then((cryptedPwd) => {
          let userToUpdate = user;
          console.log(0, userToUpdate);
          userToUpdate = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            telephone: req.body.telephone,
            password: cryptedPwd,
          };

          // let userObj = new User(userToUpdate);
          // console.log(userObj);
          // console.log(user._id);

          User.updateOne({ _id: req.body.id }, userToUpdate).then(
            (response) => {
              console.log(response);
              response.nModified == 1
                ? res.json({ message: "user modified succesfully" })
                : res.json({ message: "error" });
            }
          );
        });
      }
    });
  }
});

// accept user BL
route.get("/acceptUser/:id", (req, res) => {
  // traitement de la requete
  console.log("in accept user bl");
  console.log(0, req.params.id);

  User.findById(req.params.id).then((doc) => {
    let user=doc;
    user.status = "OK";
    let userObj = new User(user);
    User.updateOne({ _id: user._id }, userObj).then((response) => {
      response.nModified == 1
        ? res.json({ message: "user accepted" })
        : res.json({ message: "error" });
    });
  });
});

// get user by id
route.get("/:id", (req, res) => {
  console.log("in get user by id BL");
  User.findById(req.params.id).then((doc) => {
    res.json({ user: doc });
  });
});

// BL delete user

route.delete("/:id", (req, res) => {
  // traitement de la requete
  console.log("in delete user logic");
  User.deleteOne({ _id: req.params.id }).then((response) => {
    response.deletedCount == 1
      ? res.json({ message: "deleted succesfully" })
      : res.json({ message: "error" });
  });
});

module.exports = route;
